sass、Compass 安装使用
============
## 下载安装包
    ruby http://www.rubyinstaller.org/downloads/
    devkithttp://rubyinstaller.org/downloads/

## 安装ruby

    修改ruby gem 镜像(http://ruby.taobao.org/)
    $ gem sources --remove https://rubygems.org/
    $ gem sources -a http://ruby.taobao.org/
    $ gem sources -l
    *** CURRENT SOURCES ***
    http://rubyforge.org/frs/?group_id=167
    http://ruby.taobao.org
    # 请确保只有 ruby.taobao.org

## 安装带有sourcemap的版本 （cmd 命令下）

    如果以前安装过则先卸载

    gem uninstall sass
    gem uninstall compass
    gem uninstall compass -rails

    安装开发版sass 和compass

    gem install sass --pre
    gem install compass-core --pre
    gem install compass --pre

    查看是否成功
    sass --sourcemap --compass --watch sass file
    chrome控制台自动支持，查看是否有sass源文件


## gem 常用命令

    更新gem
    $ gem update -system
    卸载包
    $ gem uninstall package
    更新所有包
    $ gem update
    列出所有本地包
    $ gem list


## 常见出现问题

    ruby build 报错
    下载devkit，cmd进入windows命令操作，进入devkit的文件夹下，执行下面的操作：
        ruby dk.rb init
        ruby dk.rb install

## 相关文档

[Compass]:http://compass-style.org/
[Sass]:http://sass-lang.com/
[Compass] - Compass doc  
[Sass] - Sass doc





