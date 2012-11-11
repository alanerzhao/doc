handlebar 文档
========
# 介绍

Handlebars是JavaScript一个语义模板库，通过对view和data的分离来快速构建Web模板。它采用"Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译，这样可以保证模板加载和运行的速度。Handlebars兼容Mustache，你可以在Handlebars中导入Mustache模板。
Handlebars的安装非常简单，你只需要从Github下载最新版本，你也可访问下面网址获取最新信息：http://handlebarsjs.com/。
目前handlebars.js已经被许多项目广泛使用了，handlebars是一个纯JS库，因此你可以像使用其他JS脚本一样用script标签来包含handlebars.js

    <script type="text/javascript" src="script/handlebars-1.0.0.beta.6.js"></script>

* Handlebars expressions(语法)是handlebars模板中最基本的单元，使用方法是加两个花括号{{value}}, handlebars模板会自动匹配相应的数值，对象甚至是函数。
例如：
<div class="demo">
    <h1>{{name}}</h1>
    <p>{{content}}</p>
</div>

提供一个模板嵌入在script标签里面
例如：
<script id="tpl" type="text/x-handlebars-template">
    <div class="demo">
        <h1>{{title}}</h1>
        <p>{{content}}</p>
    </div>
</script>

使用Handlebars.compile()方法来预编译模板(这是一套规则)
    //用jquery获取模板
    var tpl   =  $("#tpl").html();
    //原生方法
    var source = document.getElementById('#tpl').innerHTML;
    //预编译模板
    var template = Handlebars.compile(source);
    //模拟json数据
    var context = { name: "zhaoshuai", content: "learn Handlebars"};
    //匹配json内容
    var html = template(context);
    //输入模板
    $(body).html(html);
Handlebar提供的一些语法

块语法（Block helper）
each block helper
你可以使用内置的each helper遍历列表块内容，用this来引用遍历的元素
<ul>
    {{#each name}}
        <li>{{this}}</li>
    {{/each}}
</ul>
对应适用的json格式
{
    name: [
    "html",
    "css",
    "javascript"
    ]
};
例如：
   <script id="demo" type="x-handlebars-template">
        <ul>
        <!--遍历data下的每个元素-->
        {{#each data}}
            <li>{{this}}</li>
        {{/each}}
        </ul>
    </script>
    <script type="text/javascript">
        var tpl = $('#demo').html();
        var dis = Handlebars.compile(tpl);
        //检索当前的数组元素在每个循环
        //this指当前数组
$('body').html(dis({data:["dada","asdasd","asdasdasd"]}))
        //传入json通过json属性渲染DOM
    </script>
更复杂的数据也同样适用，一定是数组就好
例如：
 <script id="demo" type="x-handlebars-template">
<table>
   <tr>
      <th>Band Name</th>
      <th>Date</th>
      <th>Album Name</th>
   </tr>
   {{#each Bands}}
      <tr>
         <td>{{Name}}</td>
         <td>{{Date}}</td>
         <td>{{Albums.0.Name}}</td>
      </tr>
   {{/each}}
</table>
    </script>
    <script type="text/javascript">
        var data = { 
    Bands : [
   {
      Name : "Band",
      Date : "Aug 14th, 2012",
      Albums : [
         {
            Name : "Generic Name"
         },
         {
            Name : "Something Else!!"
         }
      ]
   },
   {
      Name : "Other Guys",
      Date : "Aug 22nd, 2012",
      Albums : [
         {
            Name : "Album One"
         }
      ]
   }
    ]
}
console.log(data);
        var source = document.getElementById("demo").innerHTML;
        var tpl =Handlebars.compile(source);
        $("body").html(tpl(data));
    </script>
在Handlebars中，你甚至可以访问嵌套属性，如上面的例子(Albums.0.Name),值得注意的是，除了使用点号来访问嵌套属性,
你也可以使用“ .. / ”来访问父的属性
if、else block helper
Handlebars提供了if helper 你可以指定条件渲染dom
如果它的参数返回false，undefined, null, "" 或者 [] (a "falsy" value),Handlebar将不会渲染DOM
如果存在else则执行else后面的渲染
例如：
<script id="demo" type="x-handlebars-template">
          {{#if list}}
        <ul id="list">
            {{#each list}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
        {{else}}
            <p>{{error}}</p>
        {{/if}}
    </script>
    <script type="text/javascript">
        var data = {
            list1:['今天，天气不错','在家里学习Handlebars',"体验让我感觉身体不舒服"],
            "error":"数据取出错误"
        }
        var source = document.getElementById("demo").innerHTML;
        var tpl =Handlebars.compile(source);
        $("body").html(tpl(data));
Handlebars也可以使用注释写法如下
{{! 逻辑data }}

unless block helper
这个语法是反向的if语法也就是当判断的值为false时他会呈现DOM
例如：
<script id="demo" type="x-handlebars-template">
        {{#unless data}}
        <ul id="list">
            {{#each list}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
        {{else}}
            <p>{{error}}</p>
        {{/unless}}
    </script>
    <script type="text/javascript">
        var data = {
            list:['今天，天气不错','在家里学习Handlebars',"体验让我感觉身体不舒服"],
            "error":"数据取出错误"
        }
        var source = document.getElementById("demo").innerHTML;
        var tpl =Handlebars.compile(source);
        $("body").html(tpl(data));
    </script>
with block helper
 <script id="demo" type="x-handlebars-template">
        {{#if list}}
        <ul id="list">
            {{#each list}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
        {{else}}
            {{#with error}}
            <p>{{this}}</p>
            {{/with}}
        {{/if}}
    </script>
    <script type="text/javascript">
        var data = {
            list1:['今天，天气不错','在家里学习Handlebars',"体验让我感觉身体不舒服"],
            error:["数据取出错误","网络错误"]
        }
        var source = document.getElementById("demo").innerHTML;
        var tpl =Handlebars.compile(source);
        $("body").html(tpl(data));
    </script>
Handlebars Path
Handlebar支持路径和mustache
Handlebar,还支持嵌套的路径，使得能够查找嵌套低于当前上下文的属性
可以通过.来访问属性也可以使用../来访问路径
  例如
<h1>{{info.data}}</h1>

 <script id="demo" type="x-handlebars-template">
        {{#with person}}
        <h1>{{../company.name}}</h1>
        {{/with}}
    </script>
    <script type="text/javascript">
       var data = {"person": { "name": "Alan" }, company: {"name": "Rad, Inc." } };
        var source = document.getElementById("demo").innerHTML;
        var tpl =Handlebars.compile(source);
        $("body").html(tpl(data));
    </script>
Helpers
自定义helper
Handlebars.registerHelper 方法














