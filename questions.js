/* 仅包含空白问卷定义；不包含填写者答卷。 */
(function (root) {
  var data = {
  "version": "1.0.0",
  "title": "24岁男性食欲不佳及体重偏低综合评估问卷",
  "sections": [
    "基本信息与体重变化",
    "食欲及进食情况",
    "胃部及消化道症状",
    "中医体质及全身表现",
    "生活习惯及营养摄入",
    "既往病史与需要排除的问题",
    "补充信息"
  ],
  "questions": [
    {
      "id": 1,
      "section": 0,
      "title": "年龄",
      "type": "number",
      "required": true,
      "min": 1,
      "max": 120,
      "step": 1,
      "unit": "岁",
      "hint": "请输入实际年龄。"
    },
    {
      "id": 2,
      "section": 0,
      "title": "性别",
      "type": "single",
      "required": true,
      "options": [
        {
          "id": "A",
          "text": "男"
        },
        {
          "id": "B",
          "text": "女"
        },
        {
          "id": "C",
          "text": "其他"
        }
      ]
    },
    {
      "id": 3,
      "section": 0,
      "title": "身高",
      "type": "number",
      "required": true,
      "min": 50,
      "max": 250,
      "step": 0.1,
      "unit": "cm",
      "hint": "请输入身高，单位：cm。"
    },
    {
      "id": 4,
      "section": 0,
      "title": "目前体重",
      "type": "number",
      "required": true,
      "min": 10,
      "max": 400,
      "step": 0.1,
      "unit": "kg",
      "hint": "请先确认单位再填写；1斤 = 0.5 kg。"
    },
    {
      "id": 5,
      "section": 0,
      "title": "从小到现在的体重情况",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "从小就比较瘦，一直没有胖过"
        },
        {
          "id": "B",
          "text": "小时候正常，青春期以后逐渐变瘦"
        },
        {
          "id": "C",
          "text": "以前体重正常，近1～2年逐渐变瘦"
        },
        {
          "id": "D",
          "text": "以前比较胖，近几年明显消瘦"
        },
        {
          "id": "E",
          "text": "体重一直波动，时胖时瘦"
        }
      ]
    },
    {
      "id": 6,
      "section": 0,
      "title": "过去体重最高时是多少斤？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "110斤以下"
        },
        {
          "id": "B",
          "text": "110～120斤"
        },
        {
          "id": "C",
          "text": "120～130斤"
        },
        {
          "id": "D",
          "text": "130～140斤"
        },
        {
          "id": "E",
          "text": "140斤以上"
        },
        {
          "id": "F",
          "text": "不清楚"
        }
      ]
    },
    {
      "id": 7,
      "section": 0,
      "title": "最近半年体重变化",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "基本稳定"
        },
        {
          "id": "B",
          "text": "下降1～3斤"
        },
        {
          "id": "C",
          "text": "下降3～5斤"
        },
        {
          "id": "D",
          "text": "下降5～10斤"
        },
        {
          "id": "E",
          "text": "下降10斤以上"
        },
        {
          "id": "F",
          "text": "不清楚"
        }
      ]
    },
    {
      "id": 8,
      "section": 0,
      "title": "你觉得自己瘦的主要原因是什么？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "天生体质偏瘦，怎么吃都不胖"
        },
        {
          "id": "B",
          "text": "平时饭量小，摄入不足"
        },
        {
          "id": "C",
          "text": "经常不饿，没有吃饭欲望"
        },
        {
          "id": "D",
          "text": "吃饭后容易饱，吃不下"
        },
        {
          "id": "E",
          "text": "吃得不少，但体重仍然增加困难"
        },
        {
          "id": "F",
          "text": "最近压力大、睡眠差，导致食欲下降"
        },
        {
          "id": "G",
          "text": "不清楚"
        }
      ]
    },
    {
      "id": 9,
      "section": 1,
      "title": "平时是否容易产生饥饿感？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "正常，到了饭点会饿"
        },
        {
          "id": "B",
          "text": "偶尔会饿，但不明显"
        },
        {
          "id": "C",
          "text": "很少感觉到饿"
        },
        {
          "id": "D",
          "text": "即使长时间不吃饭也不觉得饿"
        },
        {
          "id": "E",
          "text": "有时很饿，有时完全不想吃"
        }
      ]
    },
    {
      "id": 10,
      "section": 1,
      "title": "你不想吃饭时，主要是哪种感觉？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "肚子不饿，完全没有进食欲望"
        },
        {
          "id": "B",
          "text": "肚子饿，但是看到饭菜不想吃"
        },
        {
          "id": "C",
          "text": "想吃，但是吃几口就饱了"
        },
        {
          "id": "D",
          "text": "看到油腻食物就没有胃口"
        },
        {
          "id": "E",
          "text": "对食物没有兴趣，觉得吃饭是一种负担"
        },
        {
          "id": "F",
          "text": "吃饭没有味道，感觉不香"
        },
        {
          "id": "G",
          "text": "其他情况"
        }
      ]
    },
    {
      "id": 11,
      "section": 1,
      "title": "你的日常饭量如何？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "比同龄人大很多"
        },
        {
          "id": "B",
          "text": "正常饭量"
        },
        {
          "id": "C",
          "text": "比同龄人吃得少一些"
        },
        {
          "id": "D",
          "text": "明显饭量小，吃半碗就饱"
        },
        {
          "id": "E",
          "text": "经常吃几口就不想吃了"
        }
      ]
    },
    {
      "id": 12,
      "section": 1,
      "title": "每顿饭通常吃多久？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "10分钟以内"
        },
        {
          "id": "B",
          "text": "10～20分钟"
        },
        {
          "id": "C",
          "text": "20～30分钟"
        },
        {
          "id": "D",
          "text": "30分钟以上，经常吃不完"
        }
      ]
    },
    {
      "id": 13,
      "section": 1,
      "title": "早、中、晚三餐的食欲情况",
      "type": "matrix",
      "required": false,
      "rows": [
        {
          "id": "breakfast",
          "label": "早餐",
          "options": [
            {
              "id": "A",
              "text": "好"
            },
            {
              "id": "B",
              "text": "一般"
            },
            {
              "id": "C",
              "text": "差"
            },
            {
              "id": "D",
              "text": "经常不吃"
            }
          ]
        },
        {
          "id": "lunch",
          "label": "午餐",
          "options": [
            {
              "id": "A",
              "text": "好"
            },
            {
              "id": "B",
              "text": "一般"
            },
            {
              "id": "C",
              "text": "差"
            }
          ]
        },
        {
          "id": "dinner",
          "label": "晚餐",
          "options": [
            {
              "id": "A",
              "text": "好"
            },
            {
              "id": "B",
              "text": "一般"
            },
            {
              "id": "C",
              "text": "差"
            }
          ]
        }
      ]
    },
    {
      "id": 14,
      "section": 1,
      "title": "哪些食物更容易让你产生食欲？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "米饭、面条等主食"
        },
        {
          "id": "B",
          "text": "肉类、鱼类、鸡蛋"
        },
        {
          "id": "C",
          "text": "蔬菜、水果"
        },
        {
          "id": "D",
          "text": "辛辣、重口味食物"
        },
        {
          "id": "E",
          "text": "酸味食物"
        },
        {
          "id": "F",
          "text": "清淡食物"
        },
        {
          "id": "G",
          "text": "零食、甜食"
        },
        {
          "id": "H",
          "text": "几乎所有食物都不太感兴趣",
          "exclusive": true
        }
      ]
    },
    {
      "id": 15,
      "section": 1,
      "title": "是否存在以下情况？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "经常不吃早餐"
        },
        {
          "id": "B",
          "text": "三餐时间不固定"
        },
        {
          "id": "C",
          "text": "经常吃外卖"
        },
        {
          "id": "D",
          "text": "经常吃零食代替正餐"
        },
        {
          "id": "E",
          "text": "饭前喜欢喝大量水、饮料"
        },
        {
          "id": "F",
          "text": "饭前喝咖啡或茶"
        },
        {
          "id": "G",
          "text": "饮食比较规律",
          "conflicts": [
            "A",
            "B",
            "D"
          ]
        },
        {
          "id": "H",
          "text": "其他"
        }
      ]
    },
    {
      "id": 16,
      "section": 2,
      "title": "饭后是否容易腹胀？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "从来没有"
        },
        {
          "id": "B",
          "text": "偶尔有"
        },
        {
          "id": "C",
          "text": "经常有，尤其吃完饭"
        },
        {
          "id": "D",
          "text": "几乎每顿饭都会腹胀"
        },
        {
          "id": "E",
          "text": "空腹也容易腹胀"
        }
      ]
    },
    {
      "id": 17,
      "section": 2,
      "title": "是否容易出现吃一点就饱的情况？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "没有，饭量正常"
        },
        {
          "id": "B",
          "text": "偶尔会"
        },
        {
          "id": "C",
          "text": "经常吃半碗就饱"
        },
        {
          "id": "D",
          "text": "吃几口就饱"
        },
        {
          "id": "E",
          "text": "不确定"
        }
      ]
    },
    {
      "id": 18,
      "section": 2,
      "title": "是否有以下胃部症状？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "胃部隐隐作痛"
        },
        {
          "id": "B",
          "text": "上腹部胀满"
        },
        {
          "id": "C",
          "text": "反酸、烧心"
        },
        {
          "id": "D",
          "text": "经常打嗝、嗳气"
        },
        {
          "id": "E",
          "text": "恶心、想吐"
        },
        {
          "id": "F",
          "text": "胃里有食物积着、不消化的感觉"
        },
        {
          "id": "G",
          "text": "饭后胃部不舒服"
        },
        {
          "id": "H",
          "text": "空腹时胃部不舒服"
        },
        {
          "id": "I",
          "text": "都没有",
          "exclusive": true
        }
      ]
    },
    {
      "id": 19,
      "section": 2,
      "title": "是否有以下肠道症状？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "经常腹泻"
        },
        {
          "id": "B",
          "text": "大便不成形"
        },
        {
          "id": "C",
          "text": "经常便秘"
        },
        {
          "id": "D",
          "text": "大便干燥、排便困难"
        },
        {
          "id": "E",
          "text": "大便黏腻、容易粘马桶"
        },
        {
          "id": "F",
          "text": "排便次数不规律"
        },
        {
          "id": "G",
          "text": "大便正常",
          "exclusive": true
        }
      ]
    },
    {
      "id": 20,
      "section": 2,
      "title": "平时每天排便几次？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "每天1～2次"
        },
        {
          "id": "B",
          "text": "每天3次及以上"
        },
        {
          "id": "C",
          "text": "每1～2天一次"
        },
        {
          "id": "D",
          "text": "每3天或更久一次"
        },
        {
          "id": "E",
          "text": "不规律"
        }
      ]
    },
    {
      "id": 21,
      "section": 2,
      "title": "是否存在以下情况？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "经常肠鸣、肚子咕噜响"
        },
        {
          "id": "B",
          "text": "经常放屁"
        },
        {
          "id": "C",
          "text": "经常肚子疼，排便后缓解"
        },
        {
          "id": "D",
          "text": "吃完饭容易想上厕所"
        },
        {
          "id": "E",
          "text": "夜间会因为腹痛或腹泻醒来",
          "warning": "夜间腹痛或腹泻"
        },
        {
          "id": "F",
          "text": "都没有",
          "exclusive": true
        }
      ]
    },
    {
      "id": 22,
      "section": 3,
      "title": "平时的精神状态如何？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "精神很好，精力充沛"
        },
        {
          "id": "B",
          "text": "正常，偶尔疲劳"
        },
        {
          "id": "C",
          "text": "经常感觉疲惫、没有精神"
        },
        {
          "id": "D",
          "text": "睡眠充足仍然觉得累"
        },
        {
          "id": "E",
          "text": "稍微活动就觉得累"
        }
      ]
    },
    {
      "id": 23,
      "section": 3,
      "title": "是否存在以下情况？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "说话声音小、气短"
        },
        {
          "id": "B",
          "text": "容易出汗，稍微活动就出汗"
        },
        {
          "id": "C",
          "text": "容易头晕、乏力"
        },
        {
          "id": "D",
          "text": "容易心慌"
        },
        {
          "id": "E",
          "text": "容易手脚冰凉"
        },
        {
          "id": "F",
          "text": "怕冷，冬天特别明显"
        },
        {
          "id": "G",
          "text": "怕热，容易出汗"
        },
        {
          "id": "H",
          "text": "都没有",
          "exclusive": true
        }
      ]
    },
    {
      "id": 24,
      "section": 3,
      "title": "平时口渴情况如何？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "不怎么口渴"
        },
        {
          "id": "B",
          "text": "正常，渴了才喝水"
        },
        {
          "id": "C",
          "text": "经常口干、想喝水"
        },
        {
          "id": "D",
          "text": "经常口苦"
        },
        {
          "id": "E",
          "text": "口干但不太想喝水"
        },
        {
          "id": "F",
          "text": "喜欢大量喝冰水"
        }
      ]
    },
    {
      "id": 25,
      "section": 3,
      "title": "平时更喜欢喝哪种水？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "温水、热水"
        },
        {
          "id": "B",
          "text": "常温水"
        },
        {
          "id": "C",
          "text": "冰水、冷饮"
        },
        {
          "id": "D",
          "text": "没有明显偏好"
        }
      ]
    },
    {
      "id": 26,
      "section": 3,
      "title": "平时身体冷热感受如何？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "比较怕冷"
        },
        {
          "id": "B",
          "text": "比较怕热"
        },
        {
          "id": "C",
          "text": "冬天怕冷、夏天怕热，基本正常"
        },
        {
          "id": "D",
          "text": "手脚凉但身体不怕冷"
        },
        {
          "id": "E",
          "text": "没有明显异常"
        }
      ]
    },
    {
      "id": 27,
      "section": 3,
      "title": "面色及身体状态",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "面色偏白"
        },
        {
          "id": "B",
          "text": "面色偏黄"
        },
        {
          "id": "C",
          "text": "面色偏暗、没有光泽"
        },
        {
          "id": "D",
          "text": "容易眼圈发黑"
        },
        {
          "id": "E",
          "text": "嘴唇颜色偏淡"
        },
        {
          "id": "F",
          "text": "面色正常",
          "exclusive": true
        },
        {
          "id": "G",
          "text": "不清楚",
          "exclusive": true
        }
      ]
    },
    {
      "id": 28,
      "section": 3,
      "title": "睡眠情况",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "睡眠很好，容易入睡"
        },
        {
          "id": "B",
          "text": "入睡困难"
        },
        {
          "id": "C",
          "text": "容易半夜醒"
        },
        {
          "id": "D",
          "text": "睡眠浅、多梦"
        },
        {
          "id": "E",
          "text": "经常熬夜，睡眠不足"
        },
        {
          "id": "F",
          "text": "睡眠时间充足但醒来仍然疲惫"
        }
      ]
    },
    {
      "id": 29,
      "section": 3,
      "title": "情绪状态",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "平时心情比较稳定",
          "conflicts": [
            "B",
            "C",
            "D",
            "E",
            "F"
          ]
        },
        {
          "id": "B",
          "text": "容易焦虑、紧张"
        },
        {
          "id": "C",
          "text": "容易烦躁、发脾气"
        },
        {
          "id": "D",
          "text": "经常心情低落"
        },
        {
          "id": "E",
          "text": "精神压力较大"
        },
        {
          "id": "F",
          "text": "情绪波动时食欲明显下降"
        },
        {
          "id": "G",
          "text": "没有明显情绪问题",
          "conflicts": [
            "B",
            "C",
            "D",
            "E",
            "F"
          ]
        }
      ]
    },
    {
      "id": 30,
      "section": 4,
      "title": "平时运动情况",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "几乎不运动"
        },
        {
          "id": "B",
          "text": "偶尔散步"
        },
        {
          "id": "C",
          "text": "每周运动1～2次"
        },
        {
          "id": "D",
          "text": "每周运动3～5次"
        },
        {
          "id": "E",
          "text": "经常进行高强度运动"
        }
      ]
    },
    {
      "id": 31,
      "section": 4,
      "title": "平时饮食结构",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "主食摄入较多"
        },
        {
          "id": "B",
          "text": "肉类摄入较多"
        },
        {
          "id": "C",
          "text": "蔬菜摄入较多"
        },
        {
          "id": "D",
          "text": "很少吃肉"
        },
        {
          "id": "E",
          "text": "很少吃蔬菜"
        },
        {
          "id": "F",
          "text": "经常喝牛奶、豆浆"
        },
        {
          "id": "G",
          "text": "经常吃水果"
        },
        {
          "id": "H",
          "text": "饮食比较单一、挑食"
        }
      ]
    },
    {
      "id": 32,
      "section": 4,
      "title": "每天大概吃几顿正餐？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "3顿"
        },
        {
          "id": "B",
          "text": "2顿"
        },
        {
          "id": "C",
          "text": "1顿"
        },
        {
          "id": "D",
          "text": "不固定"
        }
      ]
    },
    {
      "id": 33,
      "section": 4,
      "title": "是否存在以下习惯？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "抽烟"
        },
        {
          "id": "B",
          "text": "喝酒"
        },
        {
          "id": "C",
          "text": "经常喝咖啡"
        },
        {
          "id": "D",
          "text": "经常喝浓茶"
        },
        {
          "id": "E",
          "text": "经常喝碳酸饮料"
        },
        {
          "id": "F",
          "text": "经常熬夜"
        },
        {
          "id": "G",
          "text": "都没有",
          "exclusive": true
        }
      ]
    },
    {
      "id": 34,
      "section": 5,
      "title": "是否患有以下疾病？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "慢性胃炎"
        },
        {
          "id": "B",
          "text": "胃溃疡或十二指肠溃疡"
        },
        {
          "id": "C",
          "text": "幽门螺杆菌感染"
        },
        {
          "id": "D",
          "text": "肠炎或其他肠道疾病"
        },
        {
          "id": "E",
          "text": "甲状腺疾病"
        },
        {
          "id": "F",
          "text": "糖尿病"
        },
        {
          "id": "G",
          "text": "肝脏或胆囊疾病"
        },
        {
          "id": "H",
          "text": "其他慢性疾病"
        },
        {
          "id": "I",
          "text": "没有明确疾病史",
          "exclusive": true
        },
        {
          "id": "J",
          "text": "不清楚",
          "exclusive": true
        }
      ]
    },
    {
      "id": 35,
      "section": 5,
      "title": "是否有以下症状？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "经常心跳快、心慌"
        },
        {
          "id": "B",
          "text": "手抖"
        },
        {
          "id": "C",
          "text": "特别怕热、容易出汗"
        },
        {
          "id": "D",
          "text": "经常口渴、多尿"
        },
        {
          "id": "E",
          "text": "长期低热"
        },
        {
          "id": "F",
          "text": "夜间盗汗"
        },
        {
          "id": "G",
          "text": "长期咳嗽"
        },
        {
          "id": "H",
          "text": "淋巴结肿大"
        },
        {
          "id": "I",
          "text": "都没有",
          "exclusive": true
        }
      ]
    },
    {
      "id": 36,
      "section": 5,
      "title": "是否出现过以下消化道警示症状？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "黑便",
          "warning": "黑便"
        },
        {
          "id": "B",
          "text": "便血",
          "warning": "便血"
        },
        {
          "id": "C",
          "text": "持续呕吐",
          "warning": "持续呕吐"
        },
        {
          "id": "D",
          "text": "吞咽困难",
          "warning": "吞咽困难"
        },
        {
          "id": "E",
          "text": "明显或持续腹痛",
          "warning": "明显或持续腹痛"
        },
        {
          "id": "F",
          "text": "食物经常吞咽不下去",
          "warning": "食物经常吞咽不下去"
        },
        {
          "id": "G",
          "text": "均没有",
          "exclusive": true
        }
      ]
    },
    {
      "id": 37,
      "section": 5,
      "title": "过去是否做过相关检查？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "血常规"
        },
        {
          "id": "B",
          "text": "肝肾功能"
        },
        {
          "id": "C",
          "text": "甲状腺功能"
        },
        {
          "id": "D",
          "text": "空腹血糖或糖化血红蛋白"
        },
        {
          "id": "E",
          "text": "幽门螺杆菌检查"
        },
        {
          "id": "F",
          "text": "腹部超声"
        },
        {
          "id": "G",
          "text": "胃镜"
        },
        {
          "id": "H",
          "text": "肠镜"
        },
        {
          "id": "I",
          "text": "都没有做过",
          "exclusive": true
        },
        {
          "id": "J",
          "text": "不记得",
          "exclusive": true
        }
      ]
    },
    {
      "id": 38,
      "section": 5,
      "title": "是否长期服用以下药物？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "抗生素"
        },
        {
          "id": "B",
          "text": "止痛药"
        },
        {
          "id": "C",
          "text": "抑酸药、胃药"
        },
        {
          "id": "D",
          "text": "精神类药物"
        },
        {
          "id": "E",
          "text": "减肥药或其他影响食欲的药物"
        },
        {
          "id": "F",
          "text": "保健品、中药"
        },
        {
          "id": "G",
          "text": "没有长期服药",
          "exclusive": true
        }
      ]
    },
    {
      "id": 39,
      "section": 6,
      "title": "你认为自己的食欲问题持续了多久？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "从小就这样"
        },
        {
          "id": "B",
          "text": "3年及以上"
        },
        {
          "id": "C",
          "text": "1～3年"
        },
        {
          "id": "D",
          "text": "6个月～1年"
        },
        {
          "id": "E",
          "text": "3～6个月"
        },
        {
          "id": "F",
          "text": "最近才出现"
        }
      ]
    },
    {
      "id": 40,
      "section": 6,
      "title": "食欲不佳有没有明显加重的情况？",
      "type": "multi",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "天气热的时候"
        },
        {
          "id": "B",
          "text": "工作、学习压力大的时候"
        },
        {
          "id": "C",
          "text": "睡眠不足的时候"
        },
        {
          "id": "D",
          "text": "生病之后"
        },
        {
          "id": "E",
          "text": "饭后运动之后"
        },
        {
          "id": "F",
          "text": "没有明显规律",
          "exclusive": true
        },
        {
          "id": "G",
          "text": "不清楚",
          "exclusive": true
        }
      ]
    },
    {
      "id": 41,
      "section": 6,
      "title": "如果可以改善，你最希望优先解决哪个问题？",
      "type": "single",
      "required": false,
      "options": [
        {
          "id": "A",
          "text": "提高食欲，能够正常吃饭"
        },
        {
          "id": "B",
          "text": "增加体重，让身体强壮一些"
        },
        {
          "id": "C",
          "text": "改善胃胀、消化不良"
        },
        {
          "id": "D",
          "text": "改善大便问题"
        },
        {
          "id": "E",
          "text": "改善疲劳、精神状态"
        },
        {
          "id": "F",
          "text": "全面改善身体状态"
        }
      ]
    },
    {
      "id": 42,
      "section": 6,
      "title": "其他你认为重要、但问卷没有涉及的情况",
      "type": "text",
      "required": false
    }
  ]
};
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.QUESTIONNAIRE = data;
}(typeof window !== 'undefined' ? window : globalThis));
