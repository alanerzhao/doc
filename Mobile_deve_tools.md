Weinre
==================
Weinre是什么？
Weinre代表We b In spector Re mote，是一种远程调试工具。举个例子，在电脑上可以即时 的更改手机上对应网页的页面元素、样式表，或是查看Javascript变量，同时还可以看到手机上页面的错误和警告信息. 下图所示中的例子，通过在console中运行“document.body.style.backgroundcolor = 'green';” 即时改变了手机上网页的背景色。
### 下载安装  
我选用node modules 
```node install -g weinre```
```node install -g weinre```

启动
weinre --boundHost -all- --httpPort 9090

需要远程调试的页面加入
<script src="http://192.168.1.148:9090/target/target-script.js#anonymous"></script>

此页面必须打开服务器才能监听的到

本地打开

http://127.0.0.1:8080/client
点击远程网址则可以调试



