handlebar 文档
=============
## 介绍
**Handlebars**是JavaScript一个语义模板库，通过对view和data的分离来快速构建Web模板。它采用"Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译，
这样可以保证模板加载和运行的速度。Handlebars兼容Mustache，你可以在Handlebars中导入Mustache模板。

## 使用与安装
Handlebars的安装非常简单，你只需要从Github下载最新版本，你也可访问下面网址获取最新信息：http://handlebarsjs.com。
目前handlebars.js已经被许多项目广泛使用了，handlebars是一个纯JS库，因此你可以像使用其他JS脚本一样用script标签来包含handlebars.js
```html  
<script type="text/javascript" src=".js/handlebars.js"></script>
```
## 基本语法
Handlebars expressions 是handlebars模板中最基本的单元，使用方法是加两个花括号```{{value}}```, handlebars模板会自动匹配相应的数值，对象甚至是函数。
例如：
```html
<div class="demo">
    <h1>{{name}}</h1>
    <p>{{content}}</p>
</div>
```
你可以单独建立一个模板,ID（或者class）和type很重要，因为你要用他们来获取模板内容
例如：
```html
<script id="tpl" type="text/x-handlebars-template">
<div class="demo">
        <h1>{{title}}</h1>
        <p>{{content.title}}</p>
    </div>
</script>
```
handlebars会根据上下文来自动对表达式进行匹配，如果匹配项是个变量，则会输出变量的值，如果匹配项是个函数，则函数会被调用。
如果没找到匹配项，则没有输出。表达式也支持点操作符，因此你可以使用```{{content.title}}```这样的形式来调用嵌套的值或者方法，
handlebars会根据当前上下文输出content变量的title属性的值。

在JavaScript中，使用```Handlebars.compile()```方法来预编译模板
例如：(这是一套规则)
```js    
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
```
## Handlebar的表达式
### Block表达式
有时候当你需要对某条表达式进行更深入的操作时，Blocks就派上用场了，在Handlebars中，你可以在表达式后面跟随一个#号来表示Blocks，然后通过```{{/表达式}}```来结束Blocks。
如果当前的表达式是一个数组，则Handlebars会“自动展开数组”，并将Blocks的上下文设为数组中的元素。
例如：
```html
<ul>
{{#programme}}
    <li>{{language}}</li>
{{/programme}}
</ul>
```
有以下json数据
```js
{
  programme: [
    {language: "JavaScript"},
    {language: "HTML"},
    {language: "CSS"}
  ]
}
```
编译模板代码同上……
上面的代码会自动匹配```programme```数据并展开数据，渲染DOM后就是这样的
```html
<ul>
  <li>JavaScript</li>
  <li>HTML</li>
  <li>CSS</li>
</ul>
```
## Handlebars的内置块表达式（Block helper）
### 1.each block helper
你可以使用内置的```{{#each}}``` helper遍历列表块内容，用```this```来引用遍历的元素
例如：
```html
<ul>
    {{#each name}}
        <li>{{this}}</li>
    {{/each}}
</ul>
```
对应适用的json数据
```js
{
    name: ["html","css","javascript"]
};
```
这里的```this```指的是数组里的每一项元素，和上面的Block很像，但原理是不一样的这里的name是数组，而内置的each就是为了遍历数组用的，更复杂的数据也同样适用。

### 2.if else block helper
```{{#if}}```就你使用JavaScript一样，你可以指定条件渲染DOM，如果它的参数返回```false，undefined, null, "" 或者 [] (a "falsy" value)```,
Handlebar将不会渲染DOM，如果存在```{{#else}}```则执行```{{#else}}```后面的渲染
例如：
```html
{{#if list}}
<ul id="list">
    {{#each list}}
        <li>{{this}}</li>
    {{/each}}
</ul>
{{else}}
    <p>{{error}}</p>
{{/if}}
```
对应适用json数据
```js
var data = {
    info:['HTML5','CSS3',"WebGL"],
    "error":"数据取出错误"
}
```
这里```{{#if}}```判断是否存在list数组，如果存在则遍历list，如果不存在输出错误信息

### 3.unless block helper
```{{#unless}}```这个语法是反向的if语法也就是当判断的值为```false```时他会渲染DOM
例如：
```html
{{#unless data}}
<ul id="list">
    {{#each list}}
        <li>{{this}}</li>
    {{/each}}
</ul>
{{else}}
    <p>{{error}}</p>
{{/unless}}
```
### 4.with block helper
```{{#with}}```一般情况下，Handlebars模板会在编译的阶段的时候进行context传递和赋值。使用with的方法，我们可以将context转移到数据的一个section里面（如果你的数据包含section）。
这个方法在操作复杂的template时候非常有用。
```html
<div class="entry">
  <h1>{{title}}</h1>
  {{#with author}}
  <h2>By {{firstName}} {{lastName}}</h2>
  {{/with}}
</div>
```
对应适用json数据
```js
{
  title: "My first post!",
  author: {
    firstName: "Charles",
    lastName: "Jolley"
  }
}
```
### Handlebar的注释（comments）
Handlebars也可以使用注释写法如下
```js
{{! handlebars comments }}
```
### Handlebars的访问（Path）

Handlebar支持路径和```mustache```,Handlebar还支持嵌套的路径，使得能够查找嵌套低于当前上下文的属性
可以通过```.```来访问属性也可以使用```../```,来访问父级属性。
例如:（使用```.```访问的例子）
```html
<h1>{{author.id}}</h1>
```
对应json数据
```js
{
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
  };
```
例如：（使用```../```访问）
```html
{{#with person}}
    <h1>{{../company.name}}</h1>
{{/with}}
```
对应适用json数据
```js
{
    "person":
    { "name": "Alan" },
        company:
    {"name": "Rad, Inc." }
};
```
### 自定义helper
Handlebars，可以从任何上下文可以访问在一个模板，你可以使用```Handlebars.registerHelper()```方法来注册一个helper。

### 调试技巧
把下面一段"debug helper"加载到你的JavaScript代码里,然后在模板文件里通过```{{debug}}```或是```{{debug someValue}}```方便调试数据
```js
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});
```
### handlebars的jquery插件
```js
(function($) {
    var compiled = {};
    $.fn.handlebars = function(template, data) {
        if (template instanceof jQuery) {
            template = $(template).html();
        }
    compiled[template] = Handlebars.compile(template);
    this.html(compiled[template](data));
    };
})(jQuery);
$('#content').handlebars($('#template'), { name: "Alan" });
```
### QA
后端返回的数据有时候是布尔值，这时候想要查看可以直接用三个大括号```{{{value}}}``` 这样就不会转义了
### 子模板示例
```js
<script id="people-template" type="text/x-handlebars-template">
    {{> person}}
</script>
<script id="person-partial" type="text/x-handlebars-template">
  <div class="person">
    <h2>{{first_name}} {{last_name}}</h2>
    <div class="phone">{{phone}}</div>
    <div class="email"><a href="mailto:{{email}}">{{email}}</a></div>
    <div class="since">User since {{member_since}}</div>
  </div>
</script>
<script type="text/javascript" charset="utf-8">
    var _h = Handlebars;
    var template = _h.compile($("#people-template").html())
    var partial = _h.registerPartial("person",$("#person-partial").html())
    var data = {
        "first_name":"Asdasd"
    }
    $(document.body).append(template(data))
</script>
```

