## 监听所有文件
### 应用场景
 * 静态页面制作
 * 快速编写页面

### 所需配置
 * 需要有服务器请求，也就是必须要有本地服务器
 * 需要LiveReload扩展插件
 * Node.js,Grunt模块
 * 把所需模块放入当前目录 ```node_modules```,```Gruntfile.js```,```package.json```
 * 如果有gem可以单独配置config.rb

### 使用方法
 * ```grunt``` 初始化项目目录
 * ```grunt server ``` 打开一个服务器，默认监听```index.htm``` 此时更改```sass```,```js```会自动刷新
 * ```grunt build ``` 优化压缩css js 完成developer
 * ```grunt ok ``` 查看开发版
 * ```grunt clear ``` 删除构建目录
 f5刷新工具
  [F5]:http://getf5.com/

