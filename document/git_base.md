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
    git config --global commit.template

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
   
   ```--rebase``` 的意思是让合并分支线更清晰，也就是所谓的一条。
   
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
     
### 还原版本 && 替换本地改动 && 利用标签
    当然更改文件错乱，或者相还原到某个版本，首先要你查看日志信息，然后查看你提交信息的commit ID然后进行还原
      git reset commit ID  
      git reset HEAD //还原到你最近提交的版本
      git reset ^HEAD //还原到你最近提交的版本的第二个
	  git reset --soft HEAD^  //放弃最新提交

	  git reflog show master //列出操作历史
	  git reset master@{}  //恢复
      
    
    如果你越改越乱，想重新获取一份最新的，你可能重新克隆一分，或者用下面这个命令
      git checkout  files //你想还原的文件名称 还原单一文件
      
      git fetch origin  //放弃本地修改，重新获取代码，你还要把hard指向指向所有的
      git reset --hard origin/master 本并将你本地主分支指向到它,如果不指向你的log信息不会变
    
    利用标签还原版本，当你的项目开发的算做一个版本时使用村签比较合适
    git tag //查看标签
    git add tag -a v1.1 -m "mobile version 1.1"
    git reset v1.1
    git tag v1.4-lw //轻量级标签
    git tag -a v1.2 9fceb02 （commit id）//给已提交对象打标签
    
    
  
### 如果建立分支后  怎么合并代码
    分支应用场景，你在开发新功能，而这里有bug找你，你开发还没有完成，并不能全部提交，那么可以尝试分支
    新建一个分支去解决问题。
    git checkout -b deve //新建分支
    git checkout master //切换分支
    git branch -d deve  //删除分支
    git push origin <branch> // 提交分支
    git merge barnchname
    
    
## 常用命令操作

    git config --list //查看配置信息
    git help //获取帮助 
    git help clone // 获取某个命令的帮助
    git status // 查看文件状态
    git log  // 查看提交历史
    git add // 这是个多功能命令，根据目标文件的状态不同，此命令的效果也不同：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等）
    git commit -am// 跳过暂缓区
    git fetch //到远程仓库中拉取所有你本地仓库中还没有的数据有一点很重要，需要记住，fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。
    git rm
    git rm --cached //只移除暂存区
    git commit --amend // 撤消提交
    git remote -v
    有一点很重要，需要记住，fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。
    git remote show origin
    git push origin --tags //把代标签的版本推送到服务器 默认不推荐标签
    git rebase master
    git commit -a -m "commit info" 只提交暂存区文件忽略本地没有加入到暂存区的文件
	git remote rm remoteName 删除远程仓库
	git stash 保存当前工作进度 需要把本地文件追加到暂存区才可以使用


	git clean -nd //将要删除哪些文件

	git clean -fd //真要删除的文件整个世界清静了

    ###git aliases
    
    git config --global alias.co checkout
    git config --global alias.br branch
    git config --global alias.ci commit
    git config --global alias.st status
    git config --global alias.last 'log -1 HEAD'
    
    
    
## got git
	文件归档
	git archive -o last.zip master
## 高级功能
---
### 子模块
   git submodule 

        git submodule add 公用库名字
        
        .gitmodules记录了每个submodule的引用信息，知道在当前项目的位置以及仓库的所在
        
        克隆带有submodule的仓库
        git clone ../repos/project1.git project1-b
        
        git submodule
        前面带有-号告诉我们还没有检出
        检出之后再更新一下
        git submodule update
        
        cat .git/config
        
        
        把远程仓库拉到本地子模块
        git submodule add remote
        
        git submodule foreach git pull


## 相关资源
---

![Alt text](http://git-scm.com/figures/18333fig0201-tn.png)

![Alt text](http://git-scm.com/figures/18333fig0502-tn.png)

![Alt text](http://git-scm.com/figures/18333fig0511-tn.png)

## Git 笔记
* 集中式版本管理工具，都有一个单一集中管理的服务器，这是与分布式最大的区别
* 分布式版本管理工具，并不只是提取最新的文件，而是克隆整个文件的版本
* `Git` 使用 `SHA-1` 算法计算数据的校验,这里便知道每次回溯版本都需要你提
  交的`commit`的`id`也就是所谓的指像历史数据的指针。
* 文件的三种状态
 - 已提交 `committed` 已经保存到本地数据库了
 - 已修改 `modified`  修改了某些文件但没有提交
 - 已暂存 `staged`    已修改的文件放在下次提交时保存

 * git 恢复
    git reset --hard version
 
 * 查看记录命令高级还原
    git reflog
 
 * 查看谁动了你的代码
    git blam file name
 
 * 提交部分更改
    git add -p
 * 暂停
    git stash
    git stash apply
 
 * 检查丢失提交
    git fsck --lost-found

     cherry-pick从另一个分支里选出单独的一个提交，然后合并到当前分支。
     如果你正并行工作在两个或者更多的分支上，你也许会发现一个存在于所有分支上的bug。
     如果你解决了一个分支上的这个bug，你可以拣选这个对应的提交应用到其他分支上，而不会弄乱其他文件或者提交
     git cherry-pick [commit_hash]]


    Note :分支搞懂了，你在增加功能的时候新建一个分支，然后提交这个功能分支， 另一个开发人员，pull这个分支下来代码是代你这个功能，
    如果有问题，需要上线，那直接在拉下master没有问题的主分支。如果功能测试通过，后端人员合并开发分支到master
    而我下次再写代码时，可以先更新下我的主分支，这样拿到新版本的代码，再开发时，和上面操作一样。
    如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字：

    $ git clone git://github.com/schacon/grit.git mygrit

    要养成一开始就设置好 .gitignore 文件的习惯，以免将来误提交这类无用的文件。

文件 .gitignore 的格式规范如下：

所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
可以使用标准的 glob 模式匹配。
匹配模式最后跟反斜杠（/）说明要忽略的是目录。
要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。
请注意，单单 git diff 不过是显示还没有暂存起来的改动
跳过使用暂存区域
git commit -am

只从仓库移除
git rm --cached readme.txt

修改最后一次提交
有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用 --amend 选项重新提交：

$ git commit --amend
使用时需要先add所需要的文件再commit
关联远程仓库第一次需要加-u
git 恢复
git reset --hard version

查看记录命令高级还原
git reflog



