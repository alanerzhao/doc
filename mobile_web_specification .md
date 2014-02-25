# 移动web开发规范 #
	
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

##八、移动性能##

>要考虑Android低端机与2G网络场景下性能 注意！

>发布前必要检查项

>所有图片必须有进行过压缩

>考虑适度的有损压缩，如转化为80%质量的jpg图片

>考虑把大图切成多张小图，常见在banner图过大的场景

>加载性能优化, 达到打开足够快

>数据离线化，考虑将数据缓存在 localStorage

>初始请求资源数 < 4 注意！

>图片使用CSS Sprites 或 DATAURI

>外链 CSS 中避免 @import 引入

>考虑内嵌小型的静态资源内容

>初始请求资源gzip后总体积 < 50kb

>静态资源(HTML/CSS/JS/IMAGE)是否优化压缩？

>避免打包大型类库

>确保接入层已开启Gzip压缩

>尽量使用CSS3代替图片

>初始首屏之外的图片资源需延迟加载 注意！

>单页面应用(SPA)考虑延迟加载非首屏业务模块

>运行性能优化, 达到操作足够流畅

>避免 iOS 300+ms 点击延时问题 注意！

>缓存 DOM 选择与计算

>避免触发页面重绘的操作

>Debounce连续触发的事件(scroll/resize)，避免高频繁触发执行

>尽可能使用事件代理，避免批量绑定事件

>使用CSS3动画代替JS动画

>避免在低端机上使用大量CSS3渐变阴影效果，可考虑降级效果来提升流畅度

>HTML结构层级保持足够简单，推荐不超过 5 个层级

>尽能少的使用CSS高级选择器与通配选择器

>Keep it simple

>在线性能检测评定工具使用指南

>访问 Google PageSpeed 在线评定网站

>在地址栏输入目标URL地址，点击分析按钮开始检测

>按 PageSpeed 分析出的建议进行优化，优先解决红色类别的问题

##九、ios和 的问题列表##

>###伪类 :active 生效###

>要CSS伪类:active生效，只需要给document绑定touchstart或touchend事件
>
	<style>
	a {
	  color: #000;
	}
	a:active {
	  color: #fff;
	}
	</style>
	<a herf=foo >bar</a>
	<script>
	  document.addEventListener('touchstart',function(){},false);
	</script>
>###消除transition闪屏###

>两个方法
>
	-webkit-transform-style: preserve-3d;
	/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
	-webkit-backface-visibility:?hidden;
	/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
>###消除ie10里面的那个叉号###

>http://msdn.microsoft.com/en-us/library/windows/apps/hh767361.aspx>
>
	input:-ms-clear{display:none;}
>###关于ios与os端字体的优化(横竖屏会出现字体加粗不一致等)###

>ios浏览器横屏时会重置字体大小，设置 text-size-adjust 为 none 可以解决ios上的问题，但桌面版safari的字体缩放功能会失效，因此最佳方案是将 text-size-adjust 为 100% 。
>
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
	text-size-adjust: 100%;
>js事件

>click 事件普遍 300ms 的延迟 在手机上绑定click 事件，会使得操作有300ms 的延迟，体验并不是很好。 开发者大多数会使用封装的 tap 事件来代替click 事件，所谓的 tap 事件由 touchstart 事件 + touchmove 判断 + touchend 事件封装组成

>###ios点击会慢300ms###

>https://developers.google.com/mobile/articles/fast_buttons?hl=de-DE http://stackoverflow.com/questions/12238587/eliminate-300ms-delay-on-click-events-in-mobile-safari

>使用css3动画的时尽量利用3D加速，从而使得动画变得流畅。动画过程中的动画闪白可以通过backface-visibility 隐藏。

>	
	-webkit-transform-style: preserve-3d;
	-webkit-backface-visibility: hidden;
>###ie10的特殊鼠标事件###

>http://www.mansonchor.com/blog/blog_detail_73.html

>###不让android识别邮箱###
>
	<meta content="email=no" name="format-detection" />
>###禁止ios弹出各种操作窗口###
>
	-webkit-touch-callout:none
>###禁止用户选中文字###
>
	-webkit-user-select:none
>###动画效果中，使用translate比使用定位性能高###

>http://paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

>###拿到滚动条###
>
	window.scrollY
	window.scrollX
>比如要绑定一个touchmove的事件，正常的情况下类似这样(来自呼吸二氧化碳)
>
	$('div').on('touchmove', function(){
	   //.….code
	});

>而如果中间的code需要处理的东西多的话，fps就会下降影响程序顺滑度，而如果改成这样
>
	$('div').on('touchmove', function(){
	   setTimeout(function(){
	     //.….code
	   },0);
	});
>把代码放在setTimeout中，会发现程序变快.

>关于ios系统中，webapp启动图片在不同设备上的适应性设置

>	http://stackoverflow.com/questions/4687698/mulitple-apple-touch-startup-image-resolutions-for-ios-web-app-esp-for-ipad/10011893#10011893

>###关于ios系统中，中文输入法输入英文时，字母之间可能会出现一个六分之一空格###

>可以通过正则去掉
>
	this.value = this.value.replace(/\u2006/g, '');
>关于android webview中，input元素输入时出现的怪异情况

> ###外边框多一个红色什么的边框###

>Android web视图,至少在HTC EVO和三星的Galaxy Nexus中，文本输入框在输入时表现的就像占位符。情况为一个类似水印的东西在用户输入区域，一旦用户开始输入便会消失(见图片)。 在android的默认样式下当输入框获得焦点后,若存在一个绝对定位或者fixed的元素，布局会被破坏,其他元素与系统输入字段会发生重叠(如搜索图标将消失为搜索字段),可以观察到布局与原始输入字段有偏差(见截图)。 这是一个相当复杂的问题，以下简单布局可以重现这个问题:
>
	<label for="phone">Phone: *</label>
	<input type="tel" name="phone" id="phone" minlength="10" maxlength="10" inputmode="latin digits" required="required" />
>解决方法
>
	-webkit-user-modify: read-write-plaintext-only
>详细参考http://www.bielousov.com/2012/android-label-text-appears-in-input-field-as-a-placeholder/ 注意，该属性会导致中文不能输入词组，只能单个字。

>JS动态生成的select下拉菜单在Android2.x版本的默认浏览器里不起作用

>解决方法删除了overflow-x:hidden; 然后在JS生成下来菜单之后focus聚焦，这两步操作之后解决了问题。(来自岛都-小Qi)

>###HTML5标签的使用###

>在开始编写webapp时，哥建议前端工程师使用HTML5，而放弃HTML4，因为HTML5可以实现一些HTML4中无法实现的丰富的WEB应用程序的体验，可以减少开发者很多的工作量，当然了你决定使用HTML5前，一定要对此非常熟悉，要知道HTML5的新标签的作用。比如定义一块内容或文章区域可使用section标签，定义导航条或选项卡可以直接使用nav标签等等。

>###放弃CSS float属性###
>在项目开发过程中可以会遇到内容排列排列显示的布局(见下图)，假如你遇见这样的视觉稿，哥建议你放弃float，可以直接使用display:block;

>###利用CSS3边框背景属性###
>这个按钮有圆角效果，有内发光效果还有高光效果，这样的按钮使用CSS3写是无法写出来的，当然圆角可以使用CSS3来写，但高光和内发光却无法使用CSS3编写，
>这个时候你不妨使用-webkit-border-image来定义这个按钮的样式。
>
	-webkit-border-image就个很复杂的样式属性。
>###块级化a标签###
>请保证将每条数据都放在一个a标签中，为何这样做？因为在触控手机上，为提升用户体验，尽可能的保证用户的可点击区域较大。

>###自适应布局模式###
>在编写CSS时，我不建议前端工程师把容器（不管是外层容器还是内层）的宽度定死。为达到适配各种手持设备，我建议前端工程师使用自适应布局模式（支付宝采用了自适应布局模式），因为这样做可以让你的页面在ipad、itouch、ipod、iphone、android、web safarik、chrome都能够正常的显示，你无需再次考虑设备的分辨率。

>###学会使用webkit-box###
>上一节，我们说过自适应布局模式，有些同学可能会问：如何在移动设备上做到完全自适应呢？很感谢webkit为display属性提供了一个webkit-box的值，它可以帮助前端工程师做到盒子模型灵活控制。

>###如何去除Android平台中对邮箱地址的识别###
>看过iOS webapp API的同学都知道iOS提供了一个meta标签:用于禁用iOS对页面中电话号码的自动识别。在iOS中是不自动识别邮件地址的，但在Android平台，它会自动检测邮件地址，当用户touch到这个邮件地址时，Android会弹出一个框提示用户发送邮件，如果你不想Android自动识别页面中的邮件地址，你不妨加上这样一句meta标签在head中
>
	<meta content="email=no" name="format-detection" />
>###如何去除iOS和Android中的输入URL的控件条###
>你的老板或者PD或者交互设计师可能会要求你：能否让我们的webapp更加像nativeapp，我不想让用户看见那个输入url的控件条？
答案是可以做到的。我们可以利用一句简单的javascript代码来实现这个效果
>
	setTimeout(scrollTo,0,0,0);
>请注意，这句代码必须放在window.onload里才能够正常的工作，而且你的当前文档的内容高度必须是高于窗口的高度时，这句代码才能有效的执行。
>
>###如何禁止用户旋转设备###
>我曾经也想禁止用户旋转设备，也想实现像某些客户端那样：只能在肖像模式或景观模式下才能正常运行。但现在我可以很负责任的告诉你：别想了!在移动版的webkit中做不到！

>至少Apple webapp API已经说到了：我们为了让用户在safari中正常的浏览网页，我们必须保证用户的设备处于任何一个方位时，safari都能够正常的显示网页内容（也就是自适应），所以我们禁止开发者阻止浏览器的orientationchange事件，看来苹果公司的出发点是正确的，苹果确实不是一般的苹果。

>iOS已经禁止开发者阻止orientationchange事件，那Android呢？对不起，我没有找到任何资料说Android禁止开发者阻止浏览器orientationchange事件，但是在Android平台，确实也是阻止不了的。

>###如何检测用户是通过主屏启动你的webapp###

>看过Apple webapp API的同学都知道iOS为safari提供了一个将当前页面添加主屏的功能，按下iphoneipodipod touch底部工具中的小加号，或者ipad顶部左侧的小加号，就可以将当前的页面添加到设备的主屏，在设备的主屏会自动增加一个当前页面的启动图标，点击该启动图标就可以快速、便捷的启动你的webapp。从主屏启动的webapp和浏览器访问你的webapp最大的区别是它清除了浏览器上方和下方的工具条，这样你的webapp就更加像是nativeapp了，还有一个区别是window对像中的navigator子对象的一个standalone属性。iOS中浏览器直接访问站点时，navigator.standalone为false,从主屏启动webapp时，navigator.standalone为true， 我们可以通过navigator.standalone这个属性获知用户当前是否是从主屏访问我们的webapp的。

>在Android中从来没有添加到主屏这回事！

>###如何关闭iOS中键盘自动大写###
>我们知道在iOS中，当虚拟键盘弹出时，默认情况下键盘是开启首字母大写的功能的，根据某些业务场景，可能我们需要关闭这个功能，移动版本webkit为input元素提供了autocapitalize属性，通过指定autocapitalize=”off”来关闭键盘默认首字母大写。

>###iOS中如何彻底禁止用户在新窗口打开页面###
>有时我们可能需要禁止用户在新窗口打开页面，我们可以使用a标签的target=”_self“来指定用户在新窗口打开，或者target属性保持空，但是你会发现iOS的用户在这个链接的上方长按3秒钟后，iOS会弹出一个列表按钮，用户通过这些按钮仍然可以在新窗口打开页面，这样的话，开发者指定的target属性就失效了，但是可以通过指定当前元素的-webkit-touch-callout样式属性为none来禁止iOS弹出这些按钮。这个技巧仅适用iOS对于Android平台则无效。

>###iOS中如何禁止用户保存图片＼复制图片###

>我们在第13条技巧中提到元素的-webkit-touch-callout属性，同样为一个img标签指定-webkit-touch-callout为none也会禁止设备弹出列表按钮，这样用户就无法保存＼复制你的图片了。

>###iOS中如何禁止用户选中文字###

>我们通过指定文字标签的-webkit-user-select属性为none便可以禁止iOS用户选中文字。


>###如何解决盒子边框溢出###

>当你指定了一个块级元素时，并且为其定义了边框，设置了其宽度为100％。在移动设备开发过程中我们通常会对文本框定义为宽度100％，将其定义为块级元素以实现全屏自适应的样式，但此时你会发现，该元素的边框(左右)各1个像素会溢了文档，导致出现横向滚动条，为解决这一问题，我们可以为其添加一个特殊的样式-webkit-box-sizing:border-box;用来指定该盒子的大小包括边框的宽度。

>###如何解决Android 2.0以下平台中圆角的问题###

>如果大家够细心的话，在做wap站点开发时，大家应该会发现android 2.0以下的平台中问题特别的多，比如说边框圆角这个问题吧。
在对一个元素定义圆角时，为完全兼容android 2.0以下的平台，我们必须要按照以下技巧来定义边框圆角：
>
	1＼-webkit这个前缀必须要加上（在iOS中，你可以不加，但android中一定要加）；
	2＼如果对针对边框做样式定义，比如border:1px solid #000;那么-webkit-border-radius这属性必须要出现在border属性后。
	3＼假如我们有这样的视觉元素，左上角和右上角是圆角时，我们必须要先定义全局的(4个角的圆角值)-webkit-border-radius:5px;然后再依次的覆盖左下角和右下角，-webkit-border-bottom-left-radius:0;-webkit-border-bottom-right-border:0;否则在android 2.0以下的平台中将全部显示直角，还有记住！-webkit这个前缀一定要加上！

>###如何解决android平台中页面无法自适应###

>虽然你的html和css都是完全自适应的，但有一天如果你发现你的页面在android中显示的并不是自适应的时候，首先请你确认你的head标签中是否包含以下meta标签：
>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0;" />
 
>如果有的话，那请你再仔细的看清楚有没有这个属性的值width=device-width，如果没有请立即加上吧！


>###如何解决iOS 4.3版本中safari对页面中5位数字的自动识别和自动添加样式###

>新的iOS系统也就是4.3版本，升级后对safari造成了一个bug：即使你添加了如下的meta标签，safari仍然会对页面中的5位连续的数字进行自动识别，并且将其重新渲染样式，也就是说你的css对该标签是无效的。
>
	<meta name="format-detection" content="telphone=no" />
 
>我们可以用一个比较龌龊的办法来解决。比如说支付宝wap站点中显示金额的标签，我们都做了如下改写：
>
	<button class="t-balance"style="background:none;padding:0;border:0;">95009.00</button>元
>参考http://stackoverflow.com/questions/4697908/html-select-control-disabled-in-android-webview-in-emulator

##十、资源与工具##
>iOS5 Web调试工具iWebinspector iWebinpector screenshot
>	
	http://www.iwebinspector.com/

>html5与css3技术应用评估
>	
	http://html5please.com/

>各种奇妙的hack
>	
	http://browserhacks.com/
>几乎所有设备的屏幕尺寸与像素密度表
>	
	http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density
>ios端移动设备参数速查
>	
	http://ivomynttinen.com/blog/the-ios-design-cheat-sheet-volume-2/
>浏览器兼容表
>	
	http://www.quirksmode.org/compatibility.html
>移动设备查询器
>	
	https://deviceatlas.com/device-data/devices
>移动设备适配库
>	
	http://51degrees.codeplex.com/
>viewport与设备尺寸在线检测器
>	
	https://deviceatlas.com/device-data/devices
>html5移动端兼容性速查
>	
	http://mobilehtml5.org/
>在线转换字体
>	
	http://www.fontsquirrel.com/tools/webfont-generator
>css3选择器测试
>	
	http://tools.css3.info/selectors-test/test.html
>兼容性速查表
>	
	http://caniuse.com/
>浏览器的一些独特参数
>	
	http://www.browserscope.org/
>各种各样的媒体查询收集
>
	http://nmsdvid.com/snippets/
>css3动画在线制作器
>	
	http://ecd.tencent.com/css3/tools.html
>css3渐变在线制作器
>	
	http://www.colorzilla.com/gradient-editor/
>赛贝尔曲线在线制作器
>	http://cubic-bezier.com/#.17,.67,.83,.67
>flexbox在线制作器
>	http://the-echoplex.net/flexyboxes/
>CSS3各种渲染效果在线工具（IE出品）
>
	http://ie.microsoft.com/testdrive/Graphics/hands-on-css3/see-also.htm
>resize添加到收藏夹后，可直接在浏览器中出现各种分辨率的选择工具来查看不同分辨率下的页面效果
>	
	http://lab.maltewassermann.com/viewport-resizer/
>移动端手势表
>	
	http://ww1.sinaimg.cn/bmiddle/c2c57f68jw1e4fh7dmw12j20fi2w6qe1.jpg
>webkit独有的样式分析
>
	http://ued.ctrip.com/blog/wp-content/webkitcss/
##十一、moble web前端开发（事件处理）##

>通过前两篇文章，我们已经了解了mobile上的基本事件模型，这篇文章我们主要讲一下Tangram Mobile的事件。Tangram Mobile 究竟包含那些事件呢，为什么要开发这些事件？平时我们在开发的时候可能会需要一些较复杂的事件，例如双击屏幕事件、长按事件或者 滑动事件，这些事件并不是标准事件，浏览器并没有响应的实现，所以我们需要自己来实现这些事件。

>###on和un###
>Tangram Mobile里的事件，例如下面的tap、dbtap、taphold、swipe、pinch等事件都是组合事件， 那什么是组合事件呢，就是说每个事件都是通过多个事件模型组合而成的，例如tap事件是通过使用ontouchstart、 ontouchmove和ontouchend事件来完成的，这样我们需要通过特殊的on函数和un函数来添加事件监听器和移除 事件监听器，例如
>
	baidu.event.on(element, 'tap', fn); baidu.event.un(element, 'tap', fn);
>on和un函数除了可以处理Tangram Mobile的自定义事件，还可以处理标准事件，我们可以这样用，
baidu.event.on(element, 'touchstart', fn); baidu.event.un(element, 'touchstart', fn);
>###tap事件###
>触摸单击事件，一般情况我们可以通过ontouchstart或者ontouchend来完成单击的事件，那为什么还需要 这个tap事件呢，我们先来解释下这个tap事件是怎么工作的，大家就会知道什么情况下需要用这个tap事件了， 当我们按下手指并快速抬起的时候才会触发tap事件，也就是说当我们按下手指后移动手指再离开或者按下手指 很久再离开都不会触发tap事件。
>###tap event###
>这样定义tap事件是为了把tap事件和dbtap、taphold和scroll等事件区分开。 区分开有什么好处呢，例如当我们按下手指想滑动页面查看页面其他区域的时候不小心滑到一个button，如果我们这个button只注册了ontouchstart 或者ontouchend，这时候它会触发touch事件，但是这明显不是我们想要的，但是当我们给这个button添加tap 事件就不会发生这种情况，我们可以通过这种方式来添加tap事件，
>
	baidu.event.on(button, 'tap', fn);
>###dbtap事件###
>触摸双击事件，我们知道再mobile设备上onclick事件是可以使用的，那么ondbclick事件呢，大家可以试一下， 结果是不支持的，那么我们就需要自己开发一个双击事件，
>###dbtap event###
>我们可以通过这种方式来添加dbtap事件，
>
	baidu.event.on(button, 'dbtap', fn);
>我们可以通过设置dbtapThreshold来改变双击间隔时间，默认是250ms
>
	baidu.event.dbtapThreshold = 250;
>###taphold事件###
>触摸长按事件
>taphold event
>我们可以通过这种方式来添加taphold事件，
>
	baidu.event.on(button, 'taphold', fn);
>我们可以通过设置tapholdThreshold来改变长按时间，默认是600ms
>
	baidu.event.tapholdThreshold = 600;
>###swipe事件###
>触摸滑动事件，手指按住屏幕左右滑动的时候会触发事件，相册功能经常会用到这个事件， 当用户向左或向右滑动的时候，翻到相应的图片，我们可以通过这种方式来添加swipe事件，
>
	baidu.event.on(element, 'swipe', function(e){ //e.direction 滑动方向 //e.distance 滑动绝对距离 //e.delta 滑动距离 });
>我们可以通过event事件的direction来获取滑动方向，或者distance来获得滑动距离
>我们可以通过设置swipeTiggerThreshold来设置左右滑动n像素触发swipe事件，默认是20
>
	baidu.event.swipeTiggerThreshold = 20;
>###pinch事件###
>双手指放大/缩小/旋转事件，封装gesture三个事件，同时在pinch时屏蔽touch的三个事件，
>###pinch event###
>我们可以通过这种方式来添加pinch事件，
>
	baidu.event.on(element, 'pinch', function(e){ //e.rotation 手指的旋转角度 //e.scale 放缩的值 });
>###turn事件###
>旋转屏幕事件, 如果是iphone，我们可以直接使用orientationchange事件，但是anroid有些低版本 并不支持orientationchange，我们可以使用onrisize事件，android有些版本旋转后得不到准确的 innerHeight和innerWidth，我们可以通过setTimeout修复它，使用turn事件可以不用考虑以上问题，
我们可以通过这种方式来添加turn事件，
>
	baidu.event.on(element, 'turn', function(e){ //e.orientation 当前翻转状态 });
>###兼容PC浏览器（Safari）###
Tangram Mobile的事件兼容PC（safari）浏览器，兼容pc浏览器有什么好处呢？这里主要是考虑在mobile下 调试比较麻烦，目前的调试方法都不太方便，那如果兼容pc后，大家就可以使用pc上的调试工具来调试。那么 是如何做到兼容pc的呢，主要是把touch事件适配成mouse事件，
>
	getCompat = function(elem, evtName) { var _compat = { "touchstart": { name: 'mousedown', element: elem }, "touchmove": { name: 'mousemove', element: document }, "touchend": { name: 'mouseup', element: elem } }, _event = { name: evtName, element: elem }; _event = (baidu.browser.isSupportTouch ? _event : _compat[evtName]) || _event; return _event; };
>在on和un方法里面，会调用这个getCompat方法，来适配相应的事件和对象。
>###fire、fireMouseEvent、fireCustomEvent###
>fire方法可以触发各种类型的事件，包括KeyEvents、MouseEvents、HTMLEvents、UIEvents， fireMouseEvent主要是触发MouseEvents（包括touch事件），fireCustomEvent可以触发组合 事件，例如tap、dbtap、taphold、turn等事件。

