代理映射本地端口到测试机
=========

### 下载软件

  - **Fiddler2** http://www.telerik.com/fiddler
  
  - **Chrome plug** https://code.google.com/p/switchyplus/
  
  - **Switchyplus**

### 代理到指定的测试机
----
- 点击工具栏里的```Tools```下的```hosts```，更改本地hosts把下方提供的```hosts```文件复制进去```save```   

- 打开**FillderScript**标签栏，找到```OnBeforeRequest```方法   


        if (oSession.url.toLowerCase().indexOf(".mofang.com")>-1) {
      
           oSession.oRequest["User-Agent"]="lixinwei";//更改成你指定的名字
           oSession.oRequest["Disable-Cache"] = "1";  
         
        }

### Switchyplus配置  

导入提供的``` SwitchyOptions.bak```，文件既可，默认使用自动切换模式


### Hosts文件  

    # mfe share smb
    192.168.1.99 mfe.mofang.com
    
    # default
    192.168.1.99 mofang.com
    192.168.1.99 www.mofang.com
    
    # url rewrite for mofang
    
    192.168.1.99    yyt.mofang.com
    192.168.1.99    3jh.mofang.com
    192.168.1.99    3kingdoms.mofang.com
    192.168.1.99    a.mofang.com
    192.168.1.99    api.db.games.mofang
    192.168.1.99    astd.mofang.com
    192.168.1.99    card.mofang.com
    192.168.1.99    c.mofang.com
    192.168.1.99    cqzj.mofang.com
    192.168.1.99    dhsh.mofang.com
    192.168.1.99    dhzw.mofang.com
    192.168.1.99    dok.mofang.com
    192.168.1.99    dotababy.mofang.com
    192.168.1.99    dtlm.mofang.com
    192.168.1.99    dzm.mofang.com
    # 192.168.1.99    fahao.mofang.com
    192.168.1.99    fkbl.mofang.com
    192.168.1.99    frxz.mofang.com
    192.168.1.99    gc.mofang.com
    192.168.1.99    grpg.mofang.com
    192.168.1.99    hdl.mofang.com
    192.168.1.99    hh.mofang.com
    192.168.1.99    hjsds.mofang.com
    192.168.1.99    hs.mofang.com
    192.168.1.99    huoying.mofang.com
    192.168.1.99    i.mofang.com
    192.168.1.99    jj.mofang.com
    192.168.1.99    jr.mofang.com
    192.168.1.99    k.mofang.com
    192.168.1.99    lal.mofang.com
    192.168.1.99    ldt.mofang.com
    192.168.1.99    lsjs.mofang.com
    192.168.1.99    luobo2.mofang.com
    192.168.1.99    luobo.mofang.com
    192.168.1.99    mjz.mofang.com
    192.168.1.99    moe.mofang.com
    192.168.1.99    mxw.mofang.com
    # 192.168.1.99    newfahao.mofang.com
    192.168.1.99    ngb.mofang.com
    192.168.1.99    nj.mofang.com
    192.168.1.99    nt.mofang.com
    192.168.1.99    pvz2.mofang.com
    192.168.1.99    qhero.mofang.com
    192.168.1.99    rrxw.mofang.com
    192.168.1.99    sdxl.mofang.com
    192.168.1.99    sg.mofang.com
    192.168.1.99    shenqu.mofang.com
    192.168.1.99    sm.mofang.com
    192.168.1.99    t3.mofang.com
    192.168.1.99    tdh.mofang.com
    192.168.1.99    tl.mofang.com
    192.168.1.99    tmhx.mofang.com
    192.168.1.99    tszz.mofang.com
    192.168.1.99    ttfc.mofang.com
    # 192.168.1.99    u.mofang.com
    192.168.1.99    url.mofang.com
    192.168.1.99    v.mofang.com
    192.168.1.99    wangxian.mofang.com
    192.168.1.99    west.mofang.com
    192.168.1.99    wqxy.mofang.com
    192.168.1.99    wxqz.mofang.com
    192.168.1.99    xb.mofang.com
    192.168.1.99    xiyangyang.mofang.com
    192.168.1.99    xueba.mofang.com
    192.168.1.99    xyxmp.mofang.com
    192.168.1.99    yb.mofang.com
    192.168.1.99    zdzl.mofang.com
    192.168.1.99    zh.mofang.com
    192.168.1.99    zjh.mofang.com
    192.168.1.99    zsm.mofang.com
    
#### 相关文档    

[FiddlerBook]:http://fiddlerbook.com/Fiddler2/version.asp
[FiddlerDoc]:http://docs.telerik.com/fiddler/knowledgebase/fiddlerscript/modifyrequestorresponse
[FiddlerBook] - Compass doc  
[FiddlerDoc] - Sass doc

