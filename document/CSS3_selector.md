### CSS3 selector
--------

#### 属性选择器
* [att=val] ```att```是属性,```val```是值,例如[id="css3-selector"]
* [att*=val] 只要属性中包含val
* [att^=val] 以某些开头的
* [att$=val] 以某些结尾
#### 伪类选择器
* after
* before
#### 结构性选择器
* root 根元素选择器，指向html
* empty 当元素为空时，
* not 排除这个结构下面的子元素
* target
####子类选择器 存在问题，如果是列表则无事，如h2 p h2 p 因为它针对不同类
* first-child
* last-child
* nth-child() odd even
* nth-last-child
* nth-of-type
* nth-last-type
* only-child 只有一个子元素时

### 自行换行
* word-break:break-all
* word-wrap:break-word;
* white-space:nowrap;
* overflow:hidden,srcoll 
* overflow-x overflow-y
* box-sizing :border-box 百分比布局
* transform 四种功能， 旋转，绽放，倾斜，移动
* rotate 旋转 scale 缩放
* scale 缩放大小 1.5 5
* skew 倾斜 30deg 50deg
* translate 移动

### 动画
* Transitions 通过属性 property(要更改属性) duration(持续多长时间) timing-function(什么方法过渡)
* Animations 通过关键帧
*
