wget -r -p -np -k http://xxx.com/xxx

-r,  --recursive（递归）          specify recursive download.（指定递归下载）
-k,  --convert-links（转换链接）      make links in downloaded HTML point to local files.（将下载的HTML页面中的链接转换为相对链接即本地链接）
-p,  --page-requisites（页面必需元素）    get all images, etc. needed to display HTML page.（下载所有的图片等页面显示所需的内容）
-np, --no-parent（不追溯至父级）          don't ascend to the parent directory.

另外断点续传用-nc参数 日志 用-o参数

熟练掌握wget命令，可以帮助你方便的使用linux。

#### shell 命令

    文件内容查找
        grep content files 

    ssh 登录到服务器
    ssh zhaoshuai@192.168.1.99

    更改权限

    chmod -R 777 /
    chown -R www:www
    切换到root
    sudo su - 
    
    解压zip
    unzip js\ css3.zip -d aa
    压缩
    zip  压缩文件名 源文件名
    cd -          #回到上次所在目录，这个技巧我原来还真是不知道，感觉还是比较有用，省略了很多输入。
    cd            #回到主目录
    cd ~          #同样也是回到主目录

    wget -r -p -np -k http://xxx.com/xxx
    -r,  --recursive（递归）          specify recursive download.（指定递归下载）

    -k,  --convert-links（转换链接）      make links in downloaded HTML point to local files.（将下载的HTML页面中的链接转换为相对链接即本地链接）
    -p,  --page-requisites（页面必需元素）    get all images, etc. needed to display HTML page.（下载所有的图片等页面显示所需的内容）
    -np, --no-parent（不追溯至父级）          don't ascend to the parent directory.

#### chrome 
   * @http://devtoolstips.com/
   * chrome 更改css类型可以按住shift键点击颜色
   * 在source模式下command +d 可以替换下一个
   * 在elemet面板的css面板的最下方有查找css属性的搜索
   * 在element下搜索html 可以用> 查找子元素
   * command + click 多列操作
   * 可以托动代码到编辑器
   * alt多列操作
   * command + click 定位css文件位置
   * shift + css 面板颜色的图片可以更改rgba hsl等
   * command + css 颜色前的面板可以获得页面的颜色
   * alt + click 节点展开多级


笔记
------------
    ubuntu 安装 openSSH-server  
    ```sudo apt-get install openssh-server```

### httpie

查看请求头
http bbs.mofang.com --headers
查看请求主体
http bbs.mofang.com --body


