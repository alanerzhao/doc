BackBone.js 实战 笔记
------------
#### 第一章 初识BackBone
人们沿用服务器端的MVC体系结构，将其运用于前端技术的开发与管理。
 **MVC**:**Model**(模型)，**View**(视图)，**Controller**(控制器)


>Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.

**使用_.bindAll() 函数绑定对象方法**

     var divView = {
            ele : "#divTip",
            tip : "hello Underscore",
            onClick : function () {
        //如果不绑定这里的this将指向当前对象，当前点击是#divTip，所以就找不到this.tip
                $(this.ele).html(this.tip);
            },
            onAlert : function () {
                alert(1);
            }
        }
        //将多个方法绑定到指定的对象中，如果不将方法通过_.bindAll绑定到指定对象上，那么this指针将发生变话,说白了_.bindAll也是在处理this指针问题
        _.bindAll(divView,'onClick','onAlert');
        
        $(divView.ele).bind("click",divView.onClick);

**使用_.keys() 检索对象属性方法**

     var tmp = _.keys({
            name : "Baozi",
            sex  : "man",
            email : "alanerzhao\@gmail.com"
        })
        
        //tmp[0]检索出来的属性名称为name
        
        
**示例**

     $(function () {
        //在model层定义数据
        window.test = Backbone.Model.extend({
            defaults : {
                content : ""

            }
        })
        window.TestList = Backbone.Collection.extend({
            model : test
        })
        var  data = new TestList({
            content : "hello Backbone"
        })
        window.data = data;

        window.TestView = Backbone.View.extend({
            el : $("body"),
            initialize : function () {
                $("#divTip").html(data.models[0].get("content"));
            }
        })
        window.APP = new TestView;
    })

 #### 依赖库Underscore
 Underscore 的一些方法使用及介绍
 #### 第三章 事件管理
 基本事件方法
  
  `on` 方法可以监听对象，也可以监听对象属性，on方法的第一个参数事件对象可以是自定义事件也可以是Backbone提供的事件，如change是对象属性发生改变，change:age 对象的age属性发生改变，也可以同时监听多个属性，而这里传入的回调函数则的value则拿到的是**当前属性**
  
  `previous` 获取对象中某个属性的原有值
  `previousAttributes` 返回一个对象
  `set` 方法可以重置对象属性
  `once` 方法和`on`方法一样，只不过once只绑定一次
  `trigger` 解发事件的方法,触发对象中的某一个事情，一般是自定义事件，像change是backbone提供的事件。
  `off` 移除事件，使用方法和绑定事件一样，如果要移动所有事件则使用`obj.off()`
  
  
 
 

    var person = Backbone.Model.extend({
        defaults : {
            name : "",
            sex  : "女",
            age  : 24,
            score: 120
        }
    });
    var man = new person();
    //监听man对象的score属性
    //如果不写监听某个对象的属性，则value值是当前对象而不是当前值
    man.on("change:score",function (model, value) {
        //取得老的数据
        var oldscore = model.previous("score");
        var oldAllAttr = model.previousAttributes();
        //console.log(model,value);
        //和新的数据做比较
        if(value > oldscore) {
            console.log("你比上次进步" + (value - oldscore) + "分");
        } else if(value < oldscore) {
            console.log("你比上次落后" + (oldscore - value) + "分");
        } else {
            console.log("你的成绩没有变化");
        }
    })
    man.on("change:age",function (model, value) {
        //取得老的数据
        var oldAllAttr = model.previousAttributes();
        //console.log(model,value);
        //和新的数据做比较
        if(value > oldAllAttr.age) {
            console.log("你长大了" + (value - oldAllAttr.age) + "岁");
        } else if(value < oldAllAttr.age) {
            console.log("你变小" + (oldAllAttr.age - value) + "岁");
        } else {
            console.log("你正当年");
        }
    })
    man.set({"age":22})
    
**绑定一个has对象**

    var objEvent = {
        "change:score" : scoreChange,
        "change:age" : ageChange
    }
    man.on(objEvent);
    function scoreChange (model,value) {
        var old_score = model.previous("score");
        var new_score = model.get("score");
        if(old_score != new_score) {
            console.log("old_score:" + old_score + " - new_score" + new_score)
        }
    }
    function ageChange(model,value) {
        var old_age = model.previous("age");
        var new_age = model.get("age");
        if(old_age != new_age) {
            console.log("old_age:" + old_age+ " - new_age" + new_age)
        }
    }
    
**trigger 触发自定义事件**

     var person = Backbone.Model.extend({
        defaults : {
            name : "",
            sex  : "女",
            age  : 24,
            score: 120
        }
    });
    var man = new person();
    man.on("update",function(model,value) {
            console.log("trigger")
    })
    man.on("change:age",function(model,value) {
            console.log(model,value)
    })
    man.trigger("update")
    man.set("age",55)


**视图事件监听**

     (function (B) {
     var InfoView = B.View.extend({
             el : "#view",
             events : {
                'click #btnShow': 'show',
                'click #btnHide': 'hide'
             },
             show : function () {
                $("#info").show();

             },
             hide : function () {
                $("#info").hide();
             }
         })

        window.view = new InfoView();

    })(Backbone)
    
    
    
#### 第四章 数据模型

Model在Backbone中为数据模型，是一个最基础、最根本的数据基类。


    
    

    


        
    


