define("calendar",["jquery","base","mf/login"],function(require, exports, module) {

    var $ = require("jquery"),
        ui = require("base"),
        login = require("mf/login");

    function Calendar () {//{{{
       // this.init()
    }//}}}

    Calendar.prototype = {//{{{
        constructor: Calendar,
        init: function  (o) {

            var o = o || {}
            var date = o.date || new Date()

            this.year = date.getFullYear()      //本年
            this.month = date.getMonth() + 1    //本月
            this.day = date.getDate()           //本日
            this.SelectDay = o.SelectDay ? new Date(o.SelectDay) : null;

            this.onSelectDay = o.onSelectDay || function () {}
            this.onToday = o.onToday || function () {}
            this.onFinish = o.onFinish || function () {}


            this.week = ['日', "一",'二','三', '四','五', '六'];
            //this.month = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
            this.prev = $("#calendar-prev");
            this.next = $("#calendar-next");
            this.Days = [];//日期对象列表

            this.render()
            this.bind()

        },
        bind: function () {
            var self = this;
            $(this.prev).click(function () {
                self.preMonth()
            })
            this.next.click(function () {
                self.nextMonth()
            })

        },
        //当前月
        nowMonth: function() {
            var _currMonth = new Date();
            this.redraw(_currMonth)
        },
        //上一月
        preMonth: function() {
            var _prevMonth = new Date(this.year, this.month - 2, 1);
            this.redraw(_prevMonth)
        },
        //下一月
        nextMonth: function() {
            var _nextMonth = new Date(this.year, this.month, 1);
            this.redraw(_nextMonth)
        },
        getStartDay : function () {
             //本月第一天是星期几（距星期日离开的天数）
             //返回星期几
            _startDay = new Date(this.year, this.month - 1, 1).getDay();
            return _startDay;

        },
        getTotalNum : function () {
            _totalDays = new Date(this.year, this.month, 0).getDate();
            return _totalDays;

        },
        redraw : function (date) {
            this.year = date.getFullYear(); //重置年
            this.month = date.getMonth() + 1; //重置月
            this.render()
        },
        //判断是否同一日
        //网上找的
        isToday: function(d1, d2) {
            return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
        },
        render : function () {

            this.startDay = this.getStartDay();
            this.totalNum = this.getTotalNum();


            //用来保存日期列表
            var arr = [];
            //用当月第一天在一周中的日期值作为当月离第一天的天数
            for(var i = 1; i <= this.startDay; i++){ 
                arr.push(0);
            }
            //用当月最后一天在一个月中的日期值作为当月的天数
            for(var i = 1; i <= this.totalNum; i++){
                arr.push(i);
            }

            //清空原来的日期对象列表
            this.Days = [];

        var colum = Math.ceil(arr.length / 7);
        var table = $("<table>");
        var tb = $("<tbody>");
        var th = "<thead><tr>";

        for(var w = 0 ; w < this.week.length; w ++) {
            th += "<td>"+this.week[w]+"</td>";
        }

        th+="</thead></tr>"

        for(var j = 0; j< colum ;j++) {

            var tr = $("<tr>");

            for(var k = 0; k < 7; k++) {

                var td = $("<td>");
                td.html("  ")

                var d = arr.shift();

                if(d) {
                    td.html(d)
                    this.Days[d] = td;

                    var on = new Date(this.year, this.month - 1, d);
                    //判断是否今日
                    this.isToday(on, new Date()) && this.onToday(td);
                    //判断是否选择日期
                    this.SelectDay && this.isToday(on, this.SelectDay) && this.onSelectDay(td);
                }
                tr.append(td)
            }
                tb.append(tr)
        }
            table.append($(th))
            table.append(tb)
            $(".calendar-body").html(table)
            this.onFinish()
        }
    }//}}}

    //helper
    function setPostion (o) {//{{{
        var pos = {},
            offset = o.offset(),
            height = o.height();

        pos.position = "absolute"
        pos.left = offset.left;
        pos.top = offset.top + height

        return pos;
    }//}}}

        calendarList = new Calendar();

        var owner = $(".user-calendar"),//{{{
        tips = $("#calendar");
        var isAward = true;
        

        //TODO handler 处理异步登录问题
        login.onLoginSuc = function (data) {
             ui.hoverdeLay({
                currentObj :owner,
                showObj : tips,
                speed:0,
                point: {
                    left: owner.offset().left - tips.width() + owner.width(),
                    top: owner.height() + 5
                },
                before: function () {
                    //初始化日历
                    if(isAward) {
                        calendarListInit()
                    }
                    owner.css("background","#ff6c00")

                },
                oneBack: function () {
                    owner.css("background","")
                },
                callBack:function () {
                    owner.css("background","")
                }
            });//}}
        }

    function calendarListInit () {
        var signIn = window.signIn || "http://activity.test.mofang.com";
        calendarList.init({//{{{
            onFinish: function () {//{{{
                var self = this
                $("#idCalendarYear").html(this.year);
                $("#idCalendarMonth").html(this.month)
                $.ajax({
                    url: signIn + '/activity/checkin/records?id_alias=bbs',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function (data) {
                        var records = data.data.records;
                        //var records = [20150112,20151219]
                        var today = data.data
                        if(data.code == 0) {
                            function sub_day (records) {
                                var newArr = []

                                 //判断出现在的月份和之前返回的数据是不是同一个月份
                                 //也就是过滤之前的月分
                                 //现在是2月返回的是30天之内的
                                 //
                                var currentDate =  (function () {
                                   var date = new Date();
                                   var year = date.getFullYear();
                                   var month = date.getMonth() + 1;
                                   var day = date.getDate()
                                   month = month > 10 ? month :"0" + month
                                   return ""+year + month + "01"
                                }())

                                console.log(currentDate)
                                //过滤出当前月
                                for(var i=0;i<records.length;i++) {
                                    if(records[i] >= currentDate) {
                                        newArr.push(((records[i]+"").substring(6,8)) - 0)
                                        //newArr.push(records[i])
                                    }
                                }
                                //console.log(window.newArr = newArr)

                                return newArr
                            }
                            var lastDay = sub_day(records)


                             for(var i = 0, len = lastDay.length; i < len; i++){
                                 //如果已经签过
                                 //console.log(lastDay[i]]);

                                 if(!($(self.Days[lastDay[i]]).hasClass("calendar-active"))) {
                                    $(self.Days[lastDay[i]]).addClass("calendar-oldActive")
                                 }
                            }
                            isAward = false;
                        } else {
                            //console.log("没有以往签到记录")
                        }
                    },
                    error: function () {
                        //console.log(">>"+"error")
                    }
                });
            },//}}}
            onToday:function (current) {//{{{
                //if($.cookie("isAward")) {
                    ////console.log("签过了")
                    //return false;
                //} 
                //console.log(2)
                //alert(3)
                $.ajax({
                    url: signIn + '/activity/checkin?id_alias=bbs',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function (data) {
                        if(data.code == 0) {
                            //未签
                            current.removeClass("calendar-oldActive").addClass("calendar-active")
                        }
                        if (data.code == 901) {

                            //$.cookie('isAward',true,{
                                //expires : 1
                            //});

                            current.addClass("calendar-oldActive")
                            //console.log("您已签到")
                        }
                    },
                    error: function () {
                        //console.log("error")
                    }
                });
            }//}}}
        })//}}}
    }



});
seajs.use("calendar");
    
