(function () {
  'use strict';
  var data = window.QUESTIONNAIRE, core = window.QuestionnaireCore;
  var answers = {}, unit = 'kg', extra = {pastKg:'',intent:'unknown'}, current = 0, resultText = '';
  var recordStore, activeRecord = null;
  var $ = function (id) { return document.getElementById(id); };
  function node(tag, text, cls) { var n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (cls) n.className = cls; return n; }
  function button(text, handler, cls) { var b = node('button',text,cls); b.type = 'button'; b.addEventListener('click',handler); return b; }
  function say(text) { $('action-status').textContent = text; }
  function saveRecord(kind) {
    var status = kind === 'complete' ? $('action-status') : $('save-draft-status');
    try {
      var now=Date.now(), snapshot={version:data.version,answers:answers,unit:unit,extra:extra,section:current};
      activeRecord=recordStore.save(snapshot,kind,activeRecord,now,String(now)+'-'+Math.random().toString(36).slice(2));
      status.textContent='已保存到本机。下次用同一设备、同一浏览器打开此链接，在“本机填写记录”中查看或继续填写。';
      renderRecords();
    } catch(e) {status.textContent='保存未成功：'+(e.message || '浏览器存储不可用，请复制或下载答卷。');}
  }
  function loadRecord(record) {
    if(core.complete(data,answers)>0 && !window.confirm('载入此记录会替换当前填写内容。尚未保存的修改将丢失，确定继续吗？'))return;
    var s=JSON.parse(JSON.stringify(record.snapshot));answers=s.answers;unit=s.unit;extra=s.extra;activeRecord=record.id;resultText='';
    $('questionnaire').reset();$('report').value='';$('weight-unit').value=unit;$('input-4').min=unit==='jin'?20:10;$('input-4').max=unit==='jin'?800:400;
    data.questions.forEach(function(q){if(q.type==='number'||q.type==='text')$('input-'+q.id).value=answers[q.id] || '';else refreshOptions(q);});
    $('past-weight').value=extra.pastKg;$('weight-intent').value=extra.intent;
    clearErrors();update();$('result-view').hidden=true;$('form-view').hidden=false;$('records-status').textContent='已载入记录。修改后请再次保存；提交可重新查看、复制或下载完整答卷。';$('save-draft-status').textContent='';showSection(s.section,true);
    if(record.kind==='complete')submit({preventDefault:function(){}});
  }
  function renderRecords() {
    var list=$('records-list');list.replaceChildren();
    try {
      var records=recordStore.read();$('records-heading').textContent='本机填写记录（'+records.length+'）';
      if(!records.length)list.appendChild(node('p','尚未保存记录。填写时或生成答卷后，点击“保存到本机”。'));
      records.forEach(function(record){
        var item=node('div',undefined,'saved-record');
        item.appendChild(node('p',new Date(record.savedAt).toLocaleString('zh-CN')+' · '+(record.kind==='complete'?'答卷':'填写中')+' · '+core.complete(data,record.snapshot.answers)+'/42题'));
        item.appendChild(button(record.kind==='complete'?'查看答卷':'继续填写',function(){loadRecord(record);},'secondary'));
        item.appendChild(button('删除此记录',function(){
          if(!window.confirm('确定删除这份本机记录吗？删除后无法恢复。已下载的TXT不受影响。'))return;
          try{recordStore.remove(record.id);if(activeRecord===record.id)activeRecord=null;renderRecords();$('records-status').textContent='该本机记录已删除。当前页面中的已载入内容仍可继续使用。';}catch(e){$('records-status').textContent='删除未成功：'+e.message;}
        },'clear'));list.appendChild(item);
      });
    }catch(e){$('records-heading').textContent='本机填写记录';$('records-status').textContent=e.message || '无法读取本机记录，请使用TXT保存。';}
  }
  function scrollToTop() { $('progress-text').scrollIntoView({block:'start'}); }
  function refreshOptions(q) {
    $('q-' + q.id).querySelectorAll('input[type="radio"],input[type="checkbox"]').forEach(function (el) {
      var a = answers[q.id];
      el.checked = q.type === 'matrix' ? !!a && a[el.dataset.row] === el.value : q.type === 'multi' ? (a || []).indexOf(el.value) >= 0 : a === el.value;
      el.parentElement.classList.toggle('selected',el.checked);
    });
  }
  function choice(q,o,row) {
    var label = node('label',undefined,'option');
    var input = node('input'); input.type = q.type === 'multi' ? 'checkbox' : 'radio';
    input.name = 'q' + q.id + (row ? '-' + row : ''); input.value = o.id;
    if (row) input.dataset.row = row;
    input.addEventListener('change',function () {
      if (q.type === 'multi') answers[q.id] = core.toggle(q,answers[q.id],o.id,input.checked);
      else if (row) { answers[q.id] = answers[q.id] || {}; answers[q.id][row] = o.id; }
      else answers[q.id] = o.id;
      refreshOptions(q); update();
    });
    var text = node('span'); text.appendChild(node('span',o.id + '.', 'option-code')); text.appendChild(document.createTextNode(o.text));
    label.appendChild(input); label.appendChild(text); return label;
  }
  function renderQuestion(q) {
    var field = node('fieldset',undefined,'question'); field.id = 'q-' + q.id;
    var legend = node('legend',q.id + '. ' + q.title); legend.id = 'label-' + q.id;
    legend.appendChild(node('span',q.required ? '必填' : q.type === 'multi' ? '多选 · 选填' : q.type === 'matrix' ? '每餐单选 · 选填' : '选填','tag' + (q.required ? ' required' : '')));
    field.appendChild(legend);
    var body = node('div',undefined,'question-body'); field.appendChild(body);
    if(q.hint) body.appendChild(node('p',q.hint,'hint'));
    if (q.type === 'number' || q.type === 'text') {
      var input = node(q.type === 'number' ? 'input' : 'textarea'); input.id = 'input-' + q.id;
      input.setAttribute('aria-labelledby',legend.id); input.setAttribute('aria-required',String(q.required)); input.autocomplete = 'off';
      if (q.type === 'number') { input.type = 'number'; input.inputMode = q.id === 1 ? 'numeric' : 'decimal'; input.min = q.min; input.max = q.max; input.step = q.step; }
      else { input.rows = 5; input.placeholder = '请自由填写，请勿包含姓名、联系方式或其他身份信息。'; }
      input.addEventListener('input',function () { answers[q.id] = input.value; update(); });
      if(q.type === 'number') {
        var wrap = node('div',undefined,'number-row'); wrap.appendChild(input);
        if(q.id === 4) {
          var select = node('select'); select.id = 'weight-unit'; select.setAttribute('aria-label','体重单位');
          [['kg','kg'],['jin','斤']].forEach(function (pair) { var opt = node('option',pair[1]); opt.value = pair[0]; select.appendChild(opt); });
          select.addEventListener('change',function () {
            var oldKg = core.kg(input.value,unit); unit = select.value;
            if(oldKg !== null) input.value = String(Math.round(oldKg * (unit === 'jin' ? 2 : 1) * 100) / 100);
            input.min = unit === 'jin' ? 20 : 10; input.max = unit === 'jin' ? 800 : 400;
            answers[q.id] = input.value; update();
          }); wrap.appendChild(select);
        } else wrap.appendChild(node('span',q.unit,'unit'));
        body.appendChild(wrap);
      } else body.appendChild(input);
    } else if(q.type === 'matrix') {
      body.appendChild(node('p','三餐分别选择；全部填写后，本题计为完成。','hint'));
      q.rows.forEach(function(row) {
        var group = node('fieldset',undefined,'meal'); group.appendChild(node('legend',row.label));
        var opts = node('div',undefined,'options'); row.options.forEach(function(o) {opts.appendChild(choice(q,o,row.id));}); group.appendChild(opts); body.appendChild(group);
      });
    } else {
      var options = node('div',undefined,'options'); q.options.forEach(function(o) {options.appendChild(choice(q,o));}); body.appendChild(options);
      if(q.type === 'multi') body.appendChild(node('p','可选择多项；选择互斥项时会自动取消冲突的选项。','hint'));
    }
    if(!q.required) body.appendChild(button('清除此题答案',function () {
      delete answers[q.id]; refreshOptions(q); var text = field.querySelector('textarea'); if(text) text.value = ''; update();
    },'clear'));
    var err = node('p','','error-item'); err.id = 'error-' + q.id; err.hidden = true; body.appendChild(err);
    return field;
  }
  function auxiliary() {
    var box = node('details',undefined,'auxiliary'); box.id = 'auxiliary'; box.appendChild(node('summary','体重变化辅助计算（选填）'));
    box.appendChild(node('p','以下仅用于辅助计算，不计入42题，不改变第6、7题答案。不记得可留空。请勿将历史最高体重当作半年前体重。'));
    var label = node('label','半年前准确体重（kg）'); label.htmlFor = 'past-weight'; box.appendChild(label);
    var input = node('input'); input.id = 'past-weight'; input.type = 'number'; input.inputMode = 'decimal'; input.min = 10; input.max = 400; input.step = 0.1;
    input.addEventListener('input',function(){extra.pastKg = input.value; update();}); box.appendChild(input);
    var intentLabel = node('label','若体重下降，是否属于主动减重？'); intentLabel.htmlFor = 'weight-intent'; box.appendChild(intentLabel);
    var select = node('select'); select.id = 'weight-intent'; [['unknown','不清楚／未填写／不适用'],['no','否，并非主动减重'],['yes','是，主动减重']].forEach(function(p){var opt = node('option',p[1]); opt.value=p[0]; select.appendChild(opt);});
    select.addEventListener('change',function(){extra.intent=select.value;update();}); box.appendChild(select);
    var status = node('p'); status.id='weight-status'; box.appendChild(status); return box;
  }
  function update() {
    var count = core.complete(data,answers); $('progress').value = count; $('progress-text').textContent = '已完成 ' + count + '/42 题';
    var value = core.bmi(answers[3],core.kg(answers[4],unit));
    $('bmi-value').textContent = value === null ? '待填写身高和体重' : 'BMI ' + value.toFixed(1);
    $('bmi-category').textContent = core.category(value,answers[1]) + '。BMI偏低不等于已诊断营养不良或某种疾病。';
    $('weight-status').textContent = core.weightChange(answers,unit,extra).text;
  }
  function showSection(index, scroll) {
    current = index;
    document.querySelectorAll('.question-section').forEach(function(s,i){s.hidden = i !== current;});
    $('section-nav').querySelectorAll('button').forEach(function(b,i){if(i === current)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    $('section-count').textContent = '模块 ' + (index+1) + '/7'; $('previous').disabled = index === 0; $('next').hidden = index === 6; $('submit').hidden = index !== 6;
    if(scroll) { scrollToTop(); $('heading-' + index).focus({preventScroll:true}); }
  }
  function clearErrors() {
    document.querySelectorAll('.invalid').forEach(function(n){n.classList.remove('invalid');});
    document.querySelectorAll('.error-item').forEach(function(n){n.hidden=true;});
    document.querySelectorAll('[aria-invalid]').forEach(function(n){n.removeAttribute('aria-invalid');});
    $('error-summary').hidden=true;
  }
  function submit(e) {
    e.preventDefault(); clearErrors();
    var errors = core.errors(data,answers,unit);
    if(errors.length) {
      $('error-summary').textContent = '请先检查以下必填项目：' + errors.map(function(x){return x.text;}).join(' '); $('error-summary').hidden=false;
      errors.forEach(function(err){$('q-'+err.id).classList.add('invalid');$('error-'+err.id).textContent=err.text;$('error-'+err.id).hidden=false;$('q-'+err.id).querySelectorAll('input').forEach(function(input){input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby','error-'+err.id);});});
      showSection(data.questions[errors[0].id-1].section,true); $('q-'+errors[0].id).querySelector('input').focus(); return;
    }
    resultText = core.report(data,answers,unit,extra); $('report').value=resultText;
    var value=core.bmi(answers[3],core.kg(answers[4],unit)); $('result-metrics').textContent='BMI ' + value.toFixed(1) + ' · ' + core.category(value,answers[1]) + '｜已完成 ' + core.complete(data,answers) + '/42 题。BMI为参考，不代表疾病诊断。';
    var warnings=core.warnings(data,answers,unit,extra), panel=$('result-warning'); panel.replaceChildren(); panel.hidden=warnings.length===0;
    if(warnings.length){panel.appendChild(node('strong','需要关注的就医提醒'));var list=node('ul');warnings.forEach(function(w){list.appendChild(node('li',w));});panel.appendChild(list);panel.appendChild(node('p',core.guidance));}
    $('form-view').hidden=true; $('result-view').hidden=false; say(''); $('result-title').focus(); $('result-view').scrollIntoView({block:'start'});
  }
  function fallbackCopy() {
    var area=$('report'); area.focus(); area.select(); area.setSelectionRange(0,area.value.length);
    try { return document.execCommand('copy'); } catch(e){return false;}
  }
  function copy() {
    function done(ok){say(ok?'答卷已复制，请通过微信发送给问卷发起者。':'浏览器未允许自动复制。已选中答卷，请长按并选择“复制”。');}
    core.copyText(resultText,window.isSecureContext ? navigator.clipboard : null,fallbackCopy).then(done);
  }
  function download() {
    try{
      var blob=new Blob([core.txtPayload(resultText)],{type:'text/plain;charset=utf-8'}), url=URL.createObjectURL(blob);
      var a=node('a');a.href=url;a.download='健康信息答卷.txt';document.body.appendChild(a);a.click();a.remove();
      setTimeout(function(){URL.revokeObjectURL(url);},30000);
      say(/MicroMessenger/i.test(navigator.userAgent)?'已请求下载TXT。微信可能拦截下载；若没有出现文件，请使用复制答卷。':'已请求下载TXT，请在浏览器下载列表中查看。');
    }catch(e){say('此浏览器无法下载，请使用复制答卷或长按下方文字复制。');}
  }
  function reset() {
    if(!window.confirm('重新填写将清空当前答案。确定继续吗？'))return;
    answers={};extra={pastKg:'',intent:'unknown'};unit='kg';resultText='';activeRecord=null;$('save-draft-status').textContent='';$('questionnaire').reset();$('report').value='';$('input-4').min=10;$('input-4').max=400;
    data.questions.forEach(refreshOptions);clearErrors();update();$('result-view').hidden=true;$('form-view').hidden=false;$('result-warning').replaceChildren();say('');showSection(0,true);
  }
  try {
    core.validateSchema(data);
    data.sections.forEach(function(title,index){
      var navButton=button((index+1)+'. '+title,function(){showSection(index,true);});$('section-nav').appendChild(navButton);
      var section=node('section',undefined,'question-section');section.id='section-'+index;
      var heading=node('div',undefined,'section-heading');var h=node('h2',title,'section-title');h.id='heading-'+index;h.tabIndex=-1;heading.appendChild(h);heading.appendChild(node('p','可随时切换模块，返回修改已填答案。'));section.appendChild(heading);
      data.questions.filter(function(q){return q.section===index;}).forEach(function(q){section.appendChild(renderQuestion(q));
        if(q.id===4){var bmiBox=node('div',undefined,'metric-box');bmiBox.appendChild(node('strong',''));bmiBox.firstChild.id='bmi-value';var cat=node('p');cat.id='bmi-category';bmiBox.appendChild(cat);bmiBox.appendChild(node('p','中国成人参考：<18.5 体重偏低；18.5≤BMI<24 正常；24≤BMI<28 超重；≥28 肥胖。未满18岁不使用成人分类。'));section.appendChild(bmiBox);}
        if(q.id===7)section.appendChild(auxiliary());
      });$('sections').appendChild(section);
    });
    $('questionnaire').addEventListener('submit',submit);$('previous').addEventListener('click',function(){showSection(Math.max(0,current-1),true);});$('next').addEventListener('click',function(){showSection(Math.min(6,current+1),true);});
    $('copy').addEventListener('click',copy);$('download').addEventListener('click',download);$('restart').addEventListener('click',reset);
    var storage;try{storage=window.localStorage;}catch(e){storage=null;}
    recordStore=window.QuestionnaireRecords.create(storage,'health-questionnaire:records:v1:'+window.location.pathname,data);
    $('save-draft').addEventListener('click',function(){saveRecord('draft');});$('save-result').addEventListener('click',function(){saveRecord('complete');});renderRecords();
    $('edit').addEventListener('click',function(){$('result-view').hidden=true;$('form-view').hidden=false;showSection(current,true);});
    // Back/forward cache can retain memory; reload restored pages to prevent stale health answers.
    window.addEventListener('pageshow',function(event){if(event.persisted)window.location.reload();});
    $('form-view').hidden=false;showSection(0,false);update();
  }catch(error){$('fatal').hidden=false;}
}());
