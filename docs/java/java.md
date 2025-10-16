url:
136.39.68.18:10026/em/getIdcList

请求参数：
{
"budCode": "1101051001002",
"budName": "兆维",
"startTime":"",
"endTime":""
}

返回结果：

{
"data": {
"energy": [ //机楼15分钟一次的电度、预测 和 对应机楼下设备的数据详细信息、预测
{
"label": "机楼总能耗",
"unit": "kw",
"historyData": [ //机楼电度
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //机楼电度预测
{ time: "2025-09-15 10:30:00", value: 600}
]
},
{
"label": "设备1",
"unit": "kw",
"historyData": [ //设备详细数据
{ time: "2025-09-15 10:15:00",value: "1232.23"},
{ time: "2025-09-15 10:00:00",value: "1232.23"}
],
"predictData": [ //预测
{ time: "2025-09-15 10:30:00",value: "1232.23"}
]
},
{
"label": "设备2",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //预测
{ time: "2025-09-15 10:30:00", value: 600}
]
}
],

"power": [ //机楼15分钟一次的功率、预测 和 对应机楼下设备的数据详细信息、预测
{
"label": "机楼总功率",
"unit": "kw",
"historyData": [ //机楼功率
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //机楼功率预测
{ time: "2025-09-15 10:30:00", value: 600}
]
},
{
"label": "设备1",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //预测
{ time: "2025-09-15 10:00:00", value: 1595.23}
]
},
{
"label": "设备2",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //预测
{ time: "2025-09-15 10:00:00", value: 1595.23}
]
}
],

"rate": [
{
"label": "机楼date-max（日最大值）/date-avg（日平均值）",
"unit": "",
"historyData": [
{ time: "2025-09-15 00:00:00", max_value: 3781.99,ave_value: 1.636729} //机楼日最大值，日平均值
],
"predictData": [ //预测
{ time: "2025-09-16 00:00:00", max_value: 1,ave_value: 1}
]
},
{ //每个设备的最大值、日平均值
"label": "设备1",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 00:00:00", max_value: 992,ave_value: 2.0946}
],
"predictData": [ // 预测
{ time: "2025-09-16 00:00:00", max_value: 1,ave_value: 1}
]
}
]
}
}

---------------------------------------------------------------------------------------------------------------------------

url:
136.39.68.18:10026/em/getIdcList


请求参数：
{
"budCode": "1101051001002",
"budName": "兆维",
"startTime":"2025-09-01 00:00:00",
"endTime":"2025-09-15 00:00:00"
}


返回结果：

{
"data": {
"energy": [ //机楼15分钟一次的电度、预测 和 对应机楼下设备的数据详细信息、预测
{
"label": "机楼总能耗",
"unit": "kw",
"historyData": [ //机楼电度
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //机楼电度预测
{ time: "2025-09-15 10:30:00", value: 600}
]
},
{
"label": "设备1",
"unit": "kw",
"historyData": [ //设备详细数据
{ time: "2025-09-15 10:15:00",value: "1232.23"},
{ time: "2025-09-15 10:00:00",value: "1232.23"}
],
"predictData": [ //预测
{ time: "2025-09-15 10:30:00",value: "1232.23"}
]
},
{
"label": "设备2",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //预测
{ time: "2025-09-15 10:30:00", value: 600}
]
}
],

"power": [ //机楼15分钟一次的功率、预测 和 对应机楼下设备的数据详细信息、预测
{
"label": "机楼总功率",
"unit": "kw",
"historyData": [ //机楼功率
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //机楼功率预测
{ time: "2025-09-15 10:30:00", value: 600}
]
},
{
"label": "设备1",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //预测
{ time: "2025-09-15 10:00:00", value: 1595.23}
]
},
{
"label": "设备2",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 10:15:00", value: 3990.04},
{ time: "2025-09-15 10:00:00", value: 1595.23}
],
"predictData": [ //预测
{ time: "2025-09-15 10:00:00", value: 1595.23}
]
}
],

"rate": [
{
"label": "机楼date-max（日最大值）/date-avg（日平均值）",
"unit": "",
"predictDay":"121.21",
"historyData": [
{ time: "2025-09-15 00:00:00", max_value: 12.1,ave_value: 1.636729}, //机楼日最大值，日平均值
{ time: "2025-09-14 00:00:00", max_value: 13.4.99,ave_value: 1.636729},
{ time: "2025-09-13 00:00:00", max_value: 11.2.99,ave_value: 1.636729} 
],
"predictData": [
{ time: "2025-09-16 00:00:00", max_value: 3781.99,ave_value: 1.636729}
] // 预测
},
{ //每个设备的最大值、日平均值
"label": "设备1",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 00:00:00", max_value: 992,ave_value: 2.0946},
{ time: "2025-09-14 00:00:00", max_value: 992,ave_value: 2.0946}
],
"predictData": [
{ time: "2025-09-16 00:00:00", max_value: 3781.99,ave_value: 1.636729}
] // 预测
},
//每个设备的最大值、日平均值
"label": "设备2",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 00:00:00", max_value: 992,ave_value: 2.0946},
{ time: "2025-09-14 00:00:00", max_value: 992,ave_value: 2.0946}
],
"predictData": [
{ time: "2025-09-16 00:00:00", max_value: 3781.99,ave_value: 1.636729}
] // 预测
},
//每个设备的最大值、日平均值
"label": "设备3",
"unit": "kw",
"historyData": [
{ time: "2025-09-15 00:00:00", max_value: 992,ave_value: 2.0946},
{ time: "2025-09-14 00:00:00", max_value: 992,ave_value: 2.0946}
],
"predictData": [
{ time: "2025-09-16 00:00:00", max_value: 3781.99,ave_value: 1.636729}
] // 预测
}
]
}
}