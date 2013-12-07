Git 总结分享
=========
------
## 基础使用
---
### 基础配置

首先下载完，需要进行一些常规配置，如：**Email** 、**User** 等。

    git config --global user.name "yourname" 
    git config --global user.email "youremail"
    git config --global color.ui auto //高亮
    git config --global core.editor vim

### 权限配置  

生成SSH密钥，因为需要和服务器通信,粘贴的时候要注册把**SSH==** 后面的的邮箱删掉,

密钥位置在C盘```user/alaner/.ssh ``` ```.pub```是公共密钥，私钥要保管好

    //备份密钥
    mkdir key_backup
    cp id_rsa* key_backup
    rm id_rsa*
    ssh -T git@github.com //测试是否成功

### 常规工作流  
---

### 获取文件
    第一种 获取git仓库的项目(这种是通过克隆的方式，也是最长用的)  
    
      git clone git://github.com/xxx/xxx.git  
      
    第二种 本地新建文件，然后执行相关的命令  
        mkdir demo
        cd demo
        git init //对git初始化，所有git的相关存储版本全部在这里
        git remote add origin git@git.mofang.com:zhaoshuai/demo.git
### 修改文件
    每次修改完文件需要将对应的文件加入到版本库中
        git add README //把文件加入到版本库
        git commit -m 'first commit' //提交注释，必须明确，有利用你还原文件   
        
### 提交到远程仓库
    更改完文件把代码提交到远程仓库
        git push -u origin master
    这里的流程应该是先去，把远程代码更新合并以后才去提交
        git pull --rebase  
        
## 常见问题
---
### 解决冲突
   每次更次代码，或提交代码，最常见的就是代码冲突，这问题就是开发人员，修改了同一个文件里的  
   相同的地方那么这时就要解决冲突。
  
   再从代码库更新代码到本地时，如果出现冲突，git 会停止更新合并代码而且会提示你去解决冲突，  
   然后再断续那么这时你就应该去解决相关的冲突文件，然后再把文件加入到版本库里。
   
   ``` --rebase `` 的意思是让合并分支线更清晰，也就是所谓的一条。
   
     git pull --rebase  
     git add "bouth file"
     git pull --continue //继续合并
     git pull --abort //不更新合并，退回到合并之前的代码
   
   ```pull``` 本身就是拉取代码并自动合并，还有另外一种方式就是拉取代码，  
   手动合并  
   
       git fetch origin master //从远程把代码拉下来，它会产生一个head头
     
       git merge  FETCH_HEAD  
       
       这样就把代码合并了，这中间也有可能产生冲突解决方式是一样的,
       当然手动合并就是可通过git diff 去对比目的就是减少冲突的发生
     
### 还原版本 && 替换本地改动
    当然更改文件错乱，或者相还原到某个版本，首先要你查看日志信息，然后查看你提交信息的commit ID然后进行还原
      git reset commit ID  
    如果你越改越乱，想重新获取一份最新的，你可能重新克隆一分，或者用下面这个命令
      git checkout  files //你想还原的文件名称 还原单一文件
      git fetch origin  //放弃本地修改，重新获取代码，你还要把hard指向指向所有的
      git reset --hard origin/master 本并将你本地主分支指向到它,如果不指向你的log信息不会变
      
  
### 如果建立分支后  怎么合并代码
    git checkout -b deve //新建分支
    git checkout master //切换分支
    git branch -d deve  //删除分支
    git push origin <branch> // 提交分支
    
## 常用命令操作

    git config --list //查看配置信息
    git help //获取帮助 
    git help clone // 获取某个命令的帮助
    git status // 查看文件状态
    git log  // 查看提交历史
    
    
## 高级功能
---
### 子模块
---

## 相关资源
---
