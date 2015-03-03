## Record

#### Vim 配置自定义比较工具

     git config --global diff.tool vimdiff
     git config --global difftool.prompt false
     git config --global alias.d difftool` 使用时`git d file1

#### Vim 比较命令
    vimdiff mvimdiff gvimdiff
    :vertical diffsplit FILE_RIGHT

#### Vimdiff charset

    ]c :        - next difference
    [c :        - previous difference
    do          - diff obtain 与dp相反把另一个文件的差异复制到当前文件do (diff "get"，之所以不用dg，是因为dg已经被另一个命令占用了)
    dp          - diff put 当前文件的差异复制到另一个文件
    zo          - open folded text
    zc          - close folded text
    :diffupdate - re-scan the files for differences 重新比较文件

#### Vim 命令

    VU                  整行大写
    g~~                 整行大小写反转
    vEU                 单词转为大写
    vE~                 单词大小写反转
    ggguG               所有文本小写
    gggUG               所有文本大写    :browse e           图像化文件浏览器
    :1,10 w outfile     1到10行内容写到outfile
    :1,10 w >> outfile  1到10行内容追加到outfile
    :r infile           插入文件内容
    :23r infile         插入文件23行的内容
    grep class **/*.tpl  在所有tpl文件里查找class
    gf                  打开光标下文件名对应的文件
    :bn 和 :bp → 你可以同时打开很多文件，使用这两个命令来切换下一个或上一个文件。（陈皓注：我喜欢使用:n到下一个文件）
    ctrl + V  = → 自动给缩进 （陈皓注：这个功能相当强大，我太喜欢了）

    :vimgrep /SearchItem/ **/*.scss grep文件

#### vim正则匹配

    :%s/str1/str2/        用字符串 str2 替换行中首次出现的字符串 str1
    :s/str1/str2/g        用字符串 str2 替换行中所有出现的字符串 str1
    :.,$ s/str1/str2/g    用字符串 str2 替换正文当前行到末尾所有出现的字符串 str1
    :1,$ s/str1/str2/g    用字符串 str2 替换正文中所有出现的字符串 str1
    :g/str1/s//str2/g     功能同上
    :m,ns/str1/str2/g     将从m行到n行的str1替换成str2

 * 将空格转化为制表符的命令则恰好相反：
    :set noexpandtab
    :%retab!

 * 制表符转空格
    :set expandtab
    :%retab
 * 排版注释
    gq]/


### vim 笔记
#### vim 分为普通模式、插入模式、命令模式
 查看自己是什么模式 "``` :set showmode ``` "
 (搞不清模式的清况下，可以连续按esc键)

### 新建打开文件
* ```  gvim file.txt ``` 
* ```  edit foot.txt ``` 
* ```  gvim one.c two.c ``` (** 同时编辑多个文件，默认会先打开第一个,【:next :previous :last :first 则打开第二个** :wnext)
* ``` args five.c six.c sever.h ``` (编辑另一个文件列表)
* ``` vim -R file ``` (只读文件打开)
* ``` "fyy ``` (存入寄存器，寄存器粘贴"fp)
* ``` gvim -M file ```
* ``` saveas moove.c ``` (修改文件名)

#### 普通模式移动光标
```  h j k l ``` 

#### 词移动
* ``` w ``` (向前移动一个单词，可以配合计数,如3w)
* ``` b ```  (向后移动一个单词，原理同w)
* ``` e ``` (移动到下一个单词的词末) ge 移动到前一个单词的词末
* ``` $ ``` (移动到行尾,2$移动到第二行行末)
* ``` ^ ``` (移动到行首)
* ``` 0 ``` (移动到第一行的第一个非空字符)
* ``` fx ``` (移动到一个指定字符，f是find查找的意思) F向左查找
* ``` tx ``` (把光标移动到目标沉降伯前一个字符上)
* ``` % ``` (匹配括号)
* ``` G ```  (移动到文件末)
* ``` gg ```  (移动到文件首)
* ``` ctrl + g ```  (确定当前位置)
* ``` `` ``` (使用标记跳回去原来的地方)
#### 删除字符
* ``` x ```  (删除一个字符)
* ``` X ```  (删除光标左边一个字符)
* ``` dd ```  (删除一行)
* ``` cc ```  (修改一行)
* ``` J ```  (删除换行符，其实等于合并成一行)
* ``` dw ``` (删除一个单词)
* ``` daw ``` (删除一个单词)
* ``` D ```  (删除到行尾)
* ``` D ```  (删除到行尾)
* ``` S ```  (修改一整行)
* ``` s ```  (修改一个字符)
* ``` de ``` (删除一个单词)
* ``` cw ``` (修改一个词组)
* ``` r ``` (替换单个字符)
* ``` . ``` (重复执行操作)
* ``` xp ``` (交换两个字符)

#### 粘贴复制
* ``` y ``` (复制，yw 复制一个单词，yy 复制一行 Y)
* ``` p ``` (粘贴)
* ``` *yy ``` (拷贝一行到剪贴板)
* ``` *p ``` (粘贴)

#### 撤销与重做
*```  u```  (撤销操作) U (行撤销)
* ``` ctrl + r ```  (是你撤销过多，重做)

#### 插入
* ``` i ``` (在光标前插入) I (在行首)
* ``` a ``` (在光标后插入) A (在行末)

#### 新行
* ``` o ```  (在光标下方插入新的空行) O (在光标的止方插入新的空行)

#### 指定计数
* 用在很多地方(比如向上移动10行，则可以用10k，插入3个！！！，则可以用3a! esc)

#### 退出
* ``` zz ```  (保存文件并退出)
* ``` q! ```  (放弃之前的修改，并退出)
* ``` q ``` (提示退出)

#### 滚屏
* ``` ctrl + u ``` (向上滚)
* ``` ctrl + d ``` (向下滚)
* ``` ctrl + e ``` (向下滚)
* ``` ctrl + f ``` (正向滚动一整屏)
* ``` ctrl + b ``` (反向滚支一整屏)
* ``` zz ``` (光标处于屏幕中间)

#### 自定义标记(强大)
* ``` ma ``` (用a标记当前光标的位置)

#### 查找
* ``` "/String" ``` (查找指定的字符串，使用n则找到下一个)
* ``` "?String" ``` (反向查找)
* ``` "*" ``` (把光标定位到要查找的单词然后shift + *)
* ``` "#" ``` (与*号相同)
#### 可视模式 
* ``` v ``` 进入可视模式 
* ``` V ``` 选择一行
* ``` o ``` (选择模式下按o来选择一端，还是另一端)
*``` ctrl + q ``` 块选关闭所有窗口择

#### 命令
* ``` set ruler ```
* ``` set number nonumber ```
* ``` set ignorecase ```
* ``` set backgroun=dark ```
* ``` set hlsearch ```
* ``` colorscheme evening ```
* ``` args ``` (查看文件列表)
* ``` set autowrite ``` (自动保存)
* ``` write >> files ``` (追加到文件)
* ``` set modifiable  ``` (去掉保护)
* ``` set write ```
* ``` split ``` (分窗口,close关闭窗口：only关闭所有窗口 new 编辑一个新文件，接收计算例如3split demo.c)
* ``` ctrl + w + "+" ``` (改变窗口大小)
* ``` ctrl + w ``` (切换分割窗口，加入方向键 h j k l)
* ``` vsplit ``` (垂直分割)
* ``` ctrl + w + K ``` (移动窗口)
* ``` qall ``` (关闭所有窗口)
* ``` vertical diffsplit main.c ```
* ``` tabedit files ``` (tab页)
* ``` set noscrollbind ``` (禁止分屏光标跟随)
* ``` e : $MYVIMRC
* ``` buffers ``` 查看缓存区 buffer num 打开缓存文件


:bn -- buffer列表中下一个 buffer
:bp -- buffer列表中前一个 buffer
:b# -- 你之前所在的前一个 buffer

vimwiki
<leader>ww 在当前窗口打开维基首页
<leader>wt 在新tab打开维基首页
<leader>w<leader>w 打开/新建当天日记
<leader>w<keader>t 在新tab打开/新建当天日记
<leader>ws 选择维基项目（详见下面的“多个维基项目”一节）
map <S-F4> :VimwikiAll2HTML<cr>
map <F4> :Vimwiki2HTML<cr>

在vim中，有时需要将tab转换成space。使用ret命令（replace tab）。
[range]ret[ab]! [new-tabstop]

举例：将第一行到文件尾的tab转换成space，每个tab用4个space替代。
:set expandtab
:%ret! 4
如果没有给定4，则用当前的tab宽度设定替换为space。

其它相关命令：
:set tabstop=4        设定tab宽度为4个字符
:set shiftwidth=4     设定自动缩进为4个字符
:set expandtab        用space替代tab的输入
:set noexpandtab      不用space替代tab的输入
----- end 80 page ------







以前用editplus的时候,有一个在文件中查找的功能,可以在所有打开的文件中查找字符串,也可以在某一个目录及它的子目录中查找.那么在VIM中是否也有相关的功能呢?答案当然是肯定的.VIM中有个类似grep的命令,叫做vimgrep,语法如下:
:vimgrep /{pattern}/[g][j] {file} ...
    简单来讲,就是在路径和文件命符合{file}的所有文件中,查找符合{pattern}的字符串.(查找的结果可以用:copen命令打开quickfix列表查看).
    没有参数g的话,则行只查找一次关键字.反之会查找所有的关键字.
    没有参数j的话,查找后,VIM会跳转至第一个关键字所在的文件.反之,只更新结果列表(quickfix).

    洒家再给几个例子,比方
:vimgrep /the menu/ *.php

表示在当前目录下的扩展名为php的所有文件中,查找字符串"the menu".

:vimgrep /the menu/ ./includes/*.*

表示在当前目录中的"includes"目录里的所有文件中,查找字符串"the menu".

如果要在当前目录及其子目录中查找怎么办呢?也好办
:vimgrep /the menu/ **/*.*

用这句就可以了.

    查找时{pattern}可用正则表达式,使用起来和'/'命令是一样的,就不多说了.

    查找的结果可以用":copen"命令查看,在列表里,将光标移动至相应的位置,按回车就打开对应的文件了.
    注:

        :copen    打开quickfix

        :cclose    关闭quickfix

        :cc    是在转到当前查找到的位置
        :cn    转到下一个位置
        :cp    转到前一个位置

 当然,用grep同样可以达到这个效果,不过用vimgrep的好处就是与系统无关,能适用于所有系统的VIM,而且能自动识别文件编码和换行.嘿嘿,VIM就是你用的越多就越能感觉到它的强大了.
 gD 跳到第一次引用的地方
 gd 只在当前函数查找
 marker 建立标记 m1 建立1 m2 建立2 使用`1 `2跳转
 makes 查看标记
 gf 跳到连接的文件
 ctrl + z stop vim  open shell
 fg commint 打开 stop vim-
 排版注释
 gq]/
 :command 列出用户定义命令
vimgrep /匹配模式/[g][j] 要搜索的文件/范围 
g：表示是否把每一行的多个匹配结果都加入
j：表示是否搜索完后定位到第一个匹配位置
vimgrep /pattern/ %           在当前打开文件中查找
vimgrep /pattern/ *             在当前目录下查找所有
vimgrep /pattern/ **            在当前目录及子目录下查找所有
vimgrep /pattern/ *.c          查找当前目录下所有.c文件
vimgrep /pattern/ **/*         只查找子目录

cn                                          查找下一个
cp                                          查找上一个
copen                                    打开quickfix
cw                                          打开quickfix
cclose                                   关闭qucikfix
help vimgrep                       查看vimgrep帮助]]


vimgrep
http://blog.csdn.net/qilihechuncai/article/details/8587389

" Amazing custom search command. Thansk to Ingo: http://stackoverflow.com/a/24818933/1147859
"vommand -nargs=+ Se execute 'vimgrep /' . [<f-args>][0] . '/ **/*.' . [<f-args>][1]
"vim -u ~/.vimrc.basic
"还有一个值得知道的技巧，在 Vim 中键入 CTRL-Z 会将 Vim 临时挂起并返回其父进程（多数情况下就是 Terminal Shell），之后在终端里输入 fg 回车之后会回到 Vim。这个技巧有助于你快捷的往返于 Vim 和 终端之间。如果你不方便按 CTRL-Z（比如 Windows……），可以用命令 :st[op] 或 :sus[pend] 代替。
"

