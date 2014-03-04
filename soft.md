编译安装指南
=======================
---------------
### 所需软件及插件

    安装node.js
    npm install -g phonegap
    npm install -g cordova
    
    ant apache download http://ant.apache.org/bindownload.cgi
    android sdk http://developer.android.com/sdk/index.html
    android ndk https://developer.android.com/tools/sdk/ndk/index.html
    cocos2d-x-2.2.2 http://www.cocos2d-x.org/download
    
    Eclipse https://www.eclipse.org/downloads/
    JDK http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html
    eclipse 插件(help  install new soft)
        ADT  https://dl-ssl.google.com/android/eclipse/
        CDT  http://download.eclipse.org/tools/cdt/releases/kepler

### 环境变量配置

#### 新建环境变量

    ANT_HOME  {yourpath} apache-ant-1.9.3
    JAVA_HOME {yourpath} jdk
    NDK_ROOT  {android-ndk-r9c}

#### 加入PATH

    D:\jdk\bin;
    E:\TDDownload\andr\adt-bundle-windows-x86-20131030\sdk\tools;
    %ANT_HOME%\bin;
    E:\TDDownload\andr\adt-bundle-windows-x86-20131030\sdk\platform-tools

### 资源

#### cordova.apache 编译指南
http://cordova.apache.org/docs/zh/edge/guide_overview_index.md.html#%E6%A6%82%E8%BF%B0

#### phonegap 编译指南
http://www.dotblogs.com.tw/maplenote/archive/2014/01/16/phonegap_android_install.aspx

####Cocos2D-HTML5 JSBinding Android编译指南
http://software.intel.com/zh-cn/blogs/2013/03/11/cocos2d-html5-jsbinding-android


