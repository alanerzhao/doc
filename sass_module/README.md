## Grunt 简单前端项构建
---------
### 应用场景  

 * 静态页面制作
 * 更改即刷新页面
 * ```css```,```js```,检查,压缩
 * 图片压缩,暂不支持(Window下有问题)

### 所需配置  

 * 需要有服务器请求，也就是必须要有本地服务器
 * 需要```LiveReload```扩展插件
 * ```Node.js```,```Grunt```模块
 * 把所需模块放入当前目录 ```node_modules```,```Gruntfile.js```,```package.json```
 * 如果有gem可以单独配置```config.rb```(可以忽略)
 * 默认支持```sass```,```compass```

### 使用方法  

 * ```grunt```         初始化项目目录
 * ```grunt server```  打开一个服务器，默认监听```index.htm``` 此时更改```sass```,```js```会自动刷新
 * ```grunt build```   优化压缩css js 完成developer
 * ```grunt ok```      查看开发版
 * ```grunt clear```   删除构建目录
 * ```grunt jshint```  检查js
 * ```grunt csslint``` 检查css


###### 比较适用于个人项目，或者练习DEMO
 -------  

#### f5刷新工具
[F5]:http://getf5.com/

