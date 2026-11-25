(function(root) {
  'use strict';
  // Storage is accessed only after explicit save/load/delete actions; never transmitted.
  function create(storage, key, data) {
    function validSnapshot(value) {
      if (!value || value.version !== data.version || !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers) || !['kg','jin'].includes(value.unit) || !Number.isInteger(value.section) || value.section < 0 || value.section > 6) return false;
      if (!value.extra || typeof value.extra.pastKg !== 'string' || !['unknown','yes','no'].includes(value.extra.intent)) return false;
      return Object.keys(value.answers).every(function(id) {
        var q = data.questions.find(function(q){return String(q.id) === id;}), a = value.answers[id];
        if (!q) return false;
        if (q.type === 'number' || q.type === 'text') return typeof a === 'string';
        function known(options, v) {return options.some(function(o){return o.id === v;});}
        if (q.type === 'single') return known(q.options,a);
        if (q.type === 'multi') return Array.isArray(a) && new Set(a).size === a.length && a.every(function(v){return known(q.options,v);});
        if (q.type === 'matrix') return a && typeof a === 'object' && !Array.isArray(a) && Object.keys(a).every(function(row){var r=q.rows.find(function(r){return r.id===row;});return r && known(r.options,a[row]);});
        return false;
      });
    }
    function read() {
      if (!storage) throw new Error('当前浏览器不允许本机存储，请使用复制或TXT下载。');
      var raw = storage.getItem(key);
      if (raw === null) return [];
      var parsed;
      try {parsed=JSON.parse(raw);}catch(e){throw new Error('本机记录无法读取，未覆盖原记录。请使用复制或TXT下载保存新答卷。');}
      if (!parsed || parsed.format !== 1 || !Array.isArray(parsed.records) || parsed.records.length > 20 || !parsed.records.every(function(r){return r && typeof r.id==='string' && r.id.length<=80 && Number.isFinite(r.savedAt) && ['draft','complete'].includes(r.kind) && validSnapshot(r.snapshot);})) throw new Error('本机记录格式或问卷版本不兼容，未覆盖原记录。');
      return parsed.records;
    }
    function write(records) { storage.setItem(key,JSON.stringify({format:1,records:records})); }
    function save(snapshot, kind, existingId, now, id) {
      if (!validSnapshot(snapshot) || !['draft','complete'].includes(kind)) throw new Error('填写数据无法保存，请检查后重试。');
      var records=read(), index=existingId ? records.findIndex(function(r){return r.id===existingId;}) : -1;
      if(index < 0 && records.length >= 20) throw new Error('已保存20份记录。请先下载备份，再删除不需要的记录。');
      var record={id:index>=0 ? existingId : id,savedAt:now,kind:kind,snapshot:JSON.parse(JSON.stringify(snapshot))};
      if(index>=0)records.splice(index,1);
      records.unshift(record);
      write(records);return record.id;
    }
    function remove(id){var records=read();write(records.filter(function(r){return r.id!==id;}));}
    return {read:read,save:save,remove:remove,validSnapshot:validSnapshot};
  }
  if(typeof module==='object' && module.exports)module.exports={create:create};else root.QuestionnaireRecords={create:create};
}(typeof window!=='undefined'?window:globalThis));
