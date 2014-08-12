Mobile web page  
================= 
---------
去除阴影	
	input, textarea, button, a,label{
-webkit-tap-highlight-color:rgba(0,0,0,0);
}

以下是规范建议，均是日常在开发当中的的一些经验，仅供参考。

## 一.头部声明 ##

>1、其中width=device-width就是说把页面宽度设置成和屏幕宽度一样
>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">

>2、首先我们来看看webkit内核中的一些私有的meta标签，这些meta标签在开发webapp时起到非常重要的作用，这个meta标签表示：强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览；
>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0,  user-scalable=0;" name="viewport" />
>3、meta标签是iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览；
>
	<meta content="yes” name=" apple-mobile-web-app-capable" />

>4、 meta标签也是iphone的私有标签，它指定的iphone中safari顶端的状态条的样式
>
	<meta content="black" name=" apple-mobile-web-app-status-bar-style"/>
>5、meta标签表示：告诉设备忽略将页面中的数字识别为电话号码
>
	<meta content="telephone=no" name="format-detection" />

<!--Win phone 高版本-->
>	
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!--forbid zoom 1:1 -->
>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />

> forbid apple tools

> 网站开启对web app程序的支持
>	
	<meta content="yes" name="apple-mobile-web-app-capable" />

>控制状态栏显示样式
>
>默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）
>
	<meta content="black" name="apple-mobile-web-app-status-bar-style" />
>phone numer select

>
	<meta name="format-detection" content="telephone=no" />
>添加到桌面时有圆角 http://iconogen.com/

>	
	<link rel="apple-touch-icon-precomposed" href="./build/img/icon.png" />
>不带高光显示
>
	<link rel="apple-touch-startup-image" href="" />

> iPad (portrait) SPLASHSCREEN
>
	<link href="src" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
>###3、当前移动主站上用到的声明：###

> 	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
	    <meta charset="UTF-8">
	    <title>魔方</title>
	    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	    <meta content="yes" name="apple-mobile-web-app-capable" />
	    <meta name="format-detection" content="telephone=no" />
	</head>
	</html>

##二、字体设置##

>###1、使用无衬线字体###
>
	body {
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
	}	
       
>iOS 4.0+ 使用英文字体 Helvetica Neue，之前的iOS版本降级使用 Helvetica。中文字体设置为华文黑体STHeiTi。 需补充说明，华文黑体并不存在iOS的字体库中(http://support.apple.com/kb/HT5484?viewlocale=en_US)， 但系统会自动将华文黑体STHeiTi兼容命中系统默认中文字体黑体-简或黑体-繁

> 
	Heiti SC Light 黑体-简 细体
	Heiti SC Medium 黑体-简 中黑
	Heiti TC Light 黑体-繁 细体
	Heiti TC Medium 黑体-繁 中黑

>原生Android下中文字体与英文字体都选择默认的无衬线字体
>
	4.0 之前版本英文字体原生 Android 使用的是 Droid Sans，中文字体原生 Android 会命中 Droid Sans Fallback
	4.0 之后中英文字体都会使用原生 Android 新的 Roboto 字体
	其他第三方 Android 系统也一致选择默认的无衬线字体

>下面区分一下无衬线字体与衬线字体之间的区别

>	
	有衬线字体英文名为： serif 
	无衬线字体英文名为： sans-serif 
	在西方国家罗马字母阵营中，字体分为两大种类：Sans Serif和Serif； 
	Serif的意思是，在字的笔画开始及结束的地方有额外的装饰，而且笔画的粗细会因直横的不同而有不同。相反的，Sans Serif则没有这些额外的装饰，笔画粗细大致差不多。

## 三、基础交互 ##
> 设置全局的CSS样式，避免图中的长按弹出菜单与选中文本的行为

>
	a, img {
    -webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 */
	}#  #
	html, body {
	    -webkit-user-select: none;   /* 禁止选中文本（如无文本选中需求，此为必选项） */
	    user-select: none;
	}

## 四、高性能Mobile Web开发 ##
>
>### 1、高性能CSS3动画  ###
>
>高性能移动Web相较PC的场景需要考虑的因素也相对更多更复杂，我们总结为以下几点： 流量、功耗与流畅度。 在PC时	代我们更多的是考虑体验上的流畅度，而在Mobile端本身丰富的场景下，需要额外关注对用户基站网络流量使用的情	况，设备耗电量的情况。
>	关于流畅度，主要体现在前端动画中，在现有的前端动画体系中，通常有两种模式：JS动画与CSS3动画。 JS动画是通	过JS动态改写样式实现动画能力的一种方案，在PC端兼容低端浏览器中不失为一种推荐方案。 而在移动端，我们选择	性能更优浏览器原生实现方案：CSS3动画。

>	然而，CSS3动画在移动多终端设备场景下，相比PC会面对更多的性能问题，主要体现在动画的卡顿与闪烁。目前对提	升移动端CSS3动画体验的主要方法有几点：
	
>1.尽可能多的利用硬件能力，如使用3D变形来开启GPU加速
>	
	-webkit-transform: translate3d(0, 0, 0);
	-moz-transform: translate3d(0, 0, 0);
	-ms-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
>2、如动画过程有闪烁（通常发生在动画开始的时候），可以尝试下面的Hack：
>	
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	-ms-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-perspective: 1000;
	-moz-perspective: 1000;
	-ms-perspective: 1000;
	perspective: 1000;
>3、如下面一个元素通过translate3d右移500px的动画流畅度会明显优于使用left属性：
>	
	#ball-1 {
	  transition: -webkit-transform .5s ease;
	  -webkit-transform: translate3d(0, 0, 0);
	}
	#ball-1.slidein {
	  -webkit-transform: translate3d(500px, 0, 0);
	}
	#ball-2 {
	  transition: left .5s ease;
	  left: 0;
	}
	#ball-2.slidein {
	  left: 500px;
	}

>注：3D变形会消耗更多的内存与功耗，应确实有性能问题时才去使用它，兼在权衡
>###2、尽可能少的使用box-shadows与gradients###
>box-shadows与gradients往往都是页面的性能杀手，尤其是在一个元素同时都使用了它们，所以拥抱扁平化设计吧
>###3、尽可能的让动画元素不在文档流中，以减少重排###
>	
	position: fixed;
	position: absolute;
>###4、优化 DOM layout 性能###
>我们从实例开始描述这个主题：
>这是两段能力上完全等同的代码，显式的差异正如我们所见，只有执行顺序的区别。但真是如此吗？下面是加了说明注释的代码版本，很好的阐述了其中的进一步差异：
>	
	// 触发两次 layout
	var newWidth = aDiv.offsetWidth + 10;   // Read
	aDiv.style.width = newWidth + 'px';     // Write
	var newHeight = aDiv.offsetHeight + 10; // Read
	aDiv.style.height = newHeight + 'px';   // Write
>
	// 只触发一次 layout
	var newWidth = aDiv.offsetWidth + 10;   // Read
	var newHeight = aDiv.offsetHeight + 10; // Read
	aDiv.style.width = newWidth + 'px';     // Write
	aDiv.style.height = newHeight + 'px';   // Write

>	从注释中可找到规律，连续的读取offsetWidth/Height属性与连续的设置width/height属性，相比分别读取设置单	个属性可少触发一次layout。
>	    
>	 从结论看似乎与执行队列有关，没错，这是浏览器的优化策略。所有可触发layout的操作都会被暂时放入 	layout-queue 中，等到必须更新的时候，再计算整个队列中所有操作影响的结果，如此就可只进行一次的layout，	从而提升性能。

>	关键一，可触发layout的操作，哪些操作下会layout的更新（也称为reflow或者relayout）？

>	我们从浏览器的源码实现入手，以开源Webkit/Blink为例， 对layout的更新，Webkit 主要通过 Document::updateLayout 与 Document::updateLayoutIgnorePendingStylesheets 两个方法：

##五、CSS动画属性性能##
>	CSS动画属性会触发整个页面的重排relayout、重绘repaint、重组recomposite
>	
>	Paint通常是其中最花费性能的，尽可能避免使用触发paint的CSS动画属性，这也是为什么我们推荐在CSS动画中使用webkit-transform: translateX(3em)的方案代替使用left: 3em，因为left会额外触发layout与paint，而webkit-transform只触发整个页面composite
>
	div {
	  -webkit-animation-duration: 5s;
	  -webkit-animation-name: move;
	  -webkit-animation-iteration-count: infinite;
	  -webkit-animation-direction: alternate;
	  width: 200px;
	  height: 200px;
	  margin: 100px;
	  background-color: #808080;
	  position: absolute;
	}
>	
	@-webkit-keyframes move{
	    from {
	        left: 100px;
	    }
	    to {
	        left: 200px;
	    }
	}
##六、布局技巧##
>	box-sizing
	
>	行内图片

>	背景图片

>	媒体查询

>	flex rem 的使用

##七、移动端JS库的使用##
>
	SwipeJS  Slide show
	DeviceJS device check
	ZeptoJS  Min version jQuery
	iscroll  scroll lib
	FastClick 解决zeptoJS tap 点透，提升click 点击

>http://www.wheattime.com/increase-your-sites-performance-with-hardware-accelerated-css.html


QA transition 抖动

开启硬件加速

.cube {
   -webkit-transform: translateZ(0);
   -moz-transform: translateZ(0);
   -ms-transform: translateZ(0);
   -o-transform: translateZ(0);
   transform: translateZ(0);
   /* Other transform properties here */
}


