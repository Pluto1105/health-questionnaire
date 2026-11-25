(function (root) {
  'use strict';
  function number(value) {
    if (value === undefined || value === null || String(value).trim() === '') return null;
    var n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  function kg(value, unit) { var n = number(value); return n === null ? null : n / (unit === 'jin' ? 2 : 1); }
  function bmi(height, weight) {
    var h = number(height), w = number(weight);
    return h !== null && h >= 50 && h <= 250 && w !== null && w >= 10 && w <= 400 ? w / Math.pow(h / 100, 2) : null;
  }
  function category(value, age) {
    if (value === null) return '信息不足，无法计算';
    if (number(age) === null || number(age) < 18) return '未满18岁或年龄不明，不适用成人分类';
    return value < 18.5 ? '体重偏低' : value < 24 ? '正常参考范围' : value < 28 ? '超重参考范围' : '肥胖参考范围';
  }
  function answered(q, a) {
    if (q.type === 'matrix') return !!a && q.rows.every(function (r) { return r.options.some(function (o) { return o.id === a[r.id]; }); });
    if (q.type === 'multi') return Array.isArray(a) && a.length > 0;
    return a !== undefined && a !== null && String(a).trim() !== '';
  }
  function complete(data, answers) { return data.questions.filter(function (q) { return answered(q, answers[q.id]); }).length; }
  function conflicts(a, b) {
    return a.exclusive || b.exclusive || (a.conflicts || []).indexOf(b.id) >= 0 || (b.conflicts || []).indexOf(a.id) >= 0;
  }
  function toggle(q, selected, id, checked) {
    var target = q.options.find(function (o) { return o.id === id; });
    if (!target) return selected || [];
    var next = (selected || []).filter(function (v) {
      if (v === id) return false;
      var previous = q.options.find(function (o) { return o.id === v; });
      return previous && (!checked || !conflicts(target, previous));
    });
    if (checked) next.push(id);
    return q.options.filter(function (o) { return next.indexOf(o.id) >= 0; }).map(function (o) { return o.id; });
  }
  function errors(data, answers, unit) {
    var list = [];
    data.questions.forEach(function (q) {
      var a = answers[q.id];
      if (q.required && !answered(q, a)) { list.push({id:q.id, text:'请填写第' + q.id + '题：' + q.title}); return; }
      if (q.type === 'number' && answered(q, a)) {
        var n = q.id === 4 ? kg(a, unit) : number(a);
        if (n === null || n < q.min || n > q.max || (q.id === 1 && !Number.isInteger(n))) {
          list.push({id:q.id, text:q.id === 4 ? '第4题：请填写10～400 kg（20～800斤），并核对单位。' : '第' + q.id + '题：请输入' + q.min + '～' + q.max + q.unit + (q.id === 1 ? '的整数。' : '。')});
        }
      }
    });
    return list;
  }
  function weightChange(answers, unit, extra) {
    extra = extra || {};
    var now = kg(answers[4], unit), past = number(extra.pastKg), intent = extra.intent || 'unknown';
    var loss = past !== null && past >= 10 && past <= 400 && now !== null && now >= 10 && now <= 400 ? past - now : null;
    var percent = loss === null ? null : loss / past * 100;
    var notable = loss !== null && (percent > 5 || loss > 5);
    var rangeConcern = answers[7] === 'D' || answers[7] === 'E';
    var text;
    if (loss !== null) {
      text = '按半年前体重' + past + ' kg与当前体重计算：' + (loss > 0 ? '下降' + loss.toFixed(1) + ' kg（' + percent.toFixed(1) + '%）' : loss < 0 ? '增加' + Math.abs(loss).toFixed(1) + ' kg' : '体重无变化') + '。';
      if (notable) text += '下降幅度达到本页关注阈值。';
    } else text = '未提供有效的半年前准确体重，无法计算精确下降比例；历史最高体重不作为半年前体重。';
    if (rangeConcern) text += '第7题报告半年下降5斤及以上，建议核实近期体重记录。';
    if (intent === 'no') text += '填写者报告并非主动减重。';
    else if (intent === 'yes') text += '填写者报告为主动减重；仍需结合症状评估。';
    else text += '是否非自主性下降尚未确认。';
    var contradiction = loss !== null && ((answers[7] === 'A' && notable) || (['B','C','D','E'].indexOf(answers[7]) >= 0 && loss <= 0));
    if (contradiction) text += '注意：第7题与辅助体重记录不一致，请核对。';
    return {loss:loss,percent:percent,notable:notable,concern:notable || rangeConcern,confirmed: (notable || answers[7] === 'E') && intent === 'no',text:text};
  }
  function warnings(data, answers, unit, extra) {
    var list = [];
    data.questions.forEach(function (q) {
      (q.options || []).forEach(function (o) {
        if (o.warning && (Array.isArray(answers[q.id]) ? answers[q.id].indexOf(o.id) >= 0 : answers[q.id] === o.id)) list.push('第' + q.id + '题 ' + o.id + '. ' + o.text);
      });
    });
    var change = weightChange(answers, unit, extra);
    if (change.confirmed) list.push('值得关注的非自主性体重下降（根据填写信息，持续性需由医生进一步核实）');
    else if (change.concern) list.push('近期体重下降值得关注，请结合是否主动减重及准确体重记录核实');
    return list;
  }
  function optionText(options, id) { var o = options.find(function (v) { return v.id === id; }); return o ? o.id + '. ' + o.text : '未填写'; }
  function answerText(q, a, unit) {
    if (q.type === 'matrix') return q.rows.map(function (r) { return r.label + '：' + optionText(r.options, (a || {})[r.id]); }).join('；');
    if (!answered(q,a)) return '未填写';
    if (q.type === 'multi') return q.options.filter(function (o) { return a.indexOf(o.id) >= 0; }).map(function (o) { return o.id + '. ' + o.text; }).join('；');
    if (q.type === 'single') return optionText(q.options,a);
    if (q.id === 4) return String(a) + (unit === 'jin' ? ' 斤（' + kg(a,unit) + ' kg）' : ' kg');
    return String(a).trim() + (q.unit ? ' ' + q.unit : '');
  }
  var guidance = '请尽快进行正规医疗评估，不要等待线上问卷分析。若有黑便或便血伴头晕、晕厥，剧烈或持续腹痛，反复呕吐且无法进水，或无法吞咽，请及时到急诊就医。';
  function report(data, answers, unit, extra) {
    var value = bmi(answers[3], kg(answers[4],unit));
    var alerts = warnings(data,answers,unit,extra);
    var lines = [data.title, '中西医结合健康信息采集与初步评估', '已完成 ' + complete(data,answers) + '/42 题（第13题三餐全部作答才计为完成）', '', '【身体指标参考】', '体重统一换算：' + (kg(answers[4],unit) === null ? '未填写' : kg(answers[4],unit) + ' kg'), 'BMI：' + (value === null ? '无法计算' : value.toFixed(1) + ' kg/m²；' + category(value,answers[1])), '中国成人参考：<18.5 体重偏低；18.5≤BMI<24 正常；24≤BMI<28 超重；≥28 肥胖。', 'BMI偏低不等于已诊断营养不良或某种疾病。成人参考不适用于未满18岁者。', '', '【体重变化辅助评估】', weightChange(answers,unit,extra).text, '参考阈值：半年内非自主性体重下降超过原体重5%或超过5 kg值得就医评估；未达到阈值不能排除问题。', '', '【警示信息汇总】'];
    lines.push(alerts.length ? alerts.join('\n') + '\n' + guidance : '已填选项中未触发预设警示；漏填、不确定或未覆盖的症状仍需核实，不能据此排除疾病。');
    data.sections.forEach(function (section,i) {
      lines.push('', '【' + section + '】');
      data.questions.filter(function(q) { return q.section === i; }).forEach(function(q) { lines.push('第' + q.id + '题 ' + q.title + '：' + answerText(q,answers[q.id],unit)); });
    });
    lines.push('', '【用途与隐私】', '本问卷为病史信息采集工具，不是经验证的诊断量表，不提供疾病诊断、中医证型判定或药物处方。', '以上为填写者自述，请结合缺失信息与正规医疗评估分析。答卷仅在本地浏览器生成，复制或下载后由填写者自行保管和分享。');
    return lines.join('\n');
  }
  function validateSchema(data) {
    if (data.questions.length !== 42 || data.sections.length !== 7) throw new Error('题库数量错误');
    data.questions.forEach(function(q,i) {
      if (q.id !== i + 1 || !q.title || q.section < 0 || q.section > 6) throw new Error('题号或模块错误');
      [q.options].concat((q.rows || []).map(function(r) {return r.options;})).filter(Boolean).forEach(function(opts) {
        if (new Set(opts.map(function(o) {return o.id;})).size !== opts.length || opts.some(function(o) {return !o.text;})) throw new Error('选项错误');
      });
    });
    return true;
  }
  function copyText(text, clipboard, fallback) {
    function legacy() { try { return !!fallback(); } catch (e) { return false; } }
    try {
      if (clipboard && typeof clipboard.writeText === 'function') return Promise.resolve(clipboard.writeText(text)).then(function(){return true;},legacy);
    } catch (e) { return Promise.resolve(legacy()); }
    return Promise.resolve(legacy());
  }
  function txtPayload(text) { return '\ufeff' + text.replace(/\r?\n/g,'\r\n'); }
  var api = {number:number,kg:kg,bmi:bmi,category:category,answered:answered,complete:complete,toggle:toggle,errors:errors,weightChange:weightChange,warnings:warnings,answerText:answerText,report:report,validateSchema:validateSchema,guidance:guidance,copyText:copyText,txtPayload:txtPayload};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.QuestionnaireCore = api;
}(typeof window !== 'undefined' ? window : globalThis));
