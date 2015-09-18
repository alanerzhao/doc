ng-flow 使用文档
==============
**tbms**业务中，大量使用到上传，包括文件上传，图片上传等，ng-flow是一款相当不错的插件，是基于`flow.js`扩展的一款`angular`组件。  

总结入门文档如下：

**repo** : [ng-flow](https://github.com/flowjs/ng-flow)

###模块依赖
```
	angular.module('app', ['flow'])
```  

####directive使用 （三种`html`使用方式）
**TODO** 尽量不要用`a`去做`ng-flow`的按钮，因为`a`有默认行为 

``` 
<input type="file" flow-btn value="上传文件" />  
<input type="file" flow-btn flow-directory  value="上传目录"/>  
<span flow-btn>上传我</span>

```
###上传块的结构  


```  

//（每一个flow-init都可以定义多个块，互相不影响)，
// 且上传所有信息都要包含在这块`flow-init`大块中
<div flow-init="{target: '/upload'}"
	 flow-files-submitted="$flow.upload()"
	 flow-file-success="$file.msg = $message">
	 
  <span class="btn" flow-btn>Upload File</span>

  <table>
	<tr ng-repeat="file in $flow.files">
		<td>{{$index+1}}</td>
		<td>{{file.name}}</td>
		<td>{{file.msg}}</td>
	</tr>
  </table>
</div>
```  

###配置参数
```
//可以选择在js初始化，也可以选择在directive中初始化
var app = angular.module('app', ['flow'])
.config(['flowFactoryProvider', function (flowFactoryProvider) {
	flowFactoryProvider.defaults = {
			target: UPLOAD,
			permanentErrors: [404, 415, 500, 501],   //出错状态码
			successStatuses: [200, 201, 202],		//成功状态码
			maxChunkRetries: 1,						 //上传失败重试次数
			chunkRetryInterval: 5000,				//上传超时
			simultaneousUploads: 4,				  //最多上传文件
			testChunks: false,					   //上传method true为GET
			singleFile:true,						 //只能上传一个文件
			allowDuplicateUploads:true

	};
	// You can also set default events:
	flowFactoryProvider.on('catchAll', function (event) {
	  ...
	});
	// Can be used with different implementations of Flow.js
	// flowFactoryProvider.factory = fustyFlowFactory;
}]);

//在directive中初始化，默认会执行flow-init
<div flow-init="{target:'/uploader'}">

</div>
```
###自定义回调函数
```
//通过在directive中定义,在controller中使用
<div flow-init="{ target:'/thames/common/v1/upload/image'}"
	 flow-file-added="vm.uploader.addedType($file,$file.getExtension())"
	 flow-files-submitted="$flow.upload()"
	 flow-error="vm.uploader.uploadError($flow)"
	 flow-file-success="vm.uploader.successController($flow, $file, $message)"
	 flow-file-error="vm.uploader.errorController( $file, $message, $flow )"
	>
   
	<span flow-btn class="btn btn-primary flow-btn">
			<b class="glyphicon glyphicon-upload"></b>
		选择文件
	</span>
 </div>
```
```
//controller
vm.uploader = {
	 //当文件增加时
	addedType: function(file,type) {
		  //类型判断
		if(type != "xls" && type != "xlsx") {
			tui.alert("请上传excel格式文件")
			return false;
		}
		return true;
		//大小判断
		//if (file.size > 1024*1024) {
			//tui.alert("文件过大")
			//return false;
		//}
		//return true;
	},
	//当文件上传成功时
	successController: function ($flow, $file, $message) {
		console.log($message)
		var resultJSON = angular.fromJson($message) || {};
		if(!resultJSON.data) {
			tui.alert("服务器出错");
			return;
		}
	},
	//上传出错时
	uploadError: function (flow) {
	},
	//上传控制器出错时	  
	errorController: function ($flow,$message,$file) {
		//FIX 否则不会上传重复文件
		$file.cancel()
	},
	cancel : function($flow,index) {
		$flow.files[index].cancel();
	}
};
```
```
//在controller中监听
$scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
  event.preventDefault();//prevent file from uploading
});
```
### 如何增加额外的信息

```
//option one
<div flow-init="{
  query: { id: 2, source: 'flow_query' },
  headers: { id: 5, source: 'flow_header' }
}">

</div>
```
```
//Option two:
<div flow-init="{
  query: functionFromcontroller
}">
</div>
```
```
//Option three:
<div flow-init="config">

</div>
function MyCtrl($scope) {
  $scope.config = {
    query: function (flowFile, flowChunk) {
      // function will be called for every request
      return {
        id: 2, source: 'flow_query'
      };
    }
  };
} 
```
### 兼容老的浏览器

```
var app = angular.module('app', ['flow'])
.config(['flowFactoryProvider', function (flowFactoryProvider) {
	flowFactoryProvider.factory = fustyFlowFactory;
}]);
```
### Tips:
1. 我在使用时，一般都不用去操作他默认的`$files`文件对象，因为在业务内上传是单独的接口。  
而且我也不关心上传文件的内容，我只需要传给后端，拿到对应的`url`，来做逻辑。  
所以一般我会把上传成功之后拿到的数据对应到`$scope`,通过对`$scope`的操作来映射`ng-flow`
2. 官方提供的示例是很好的教程可以借鉴。
3. **TBMS**业务中，**供应商管理模块**，**行程模块**，**目的地模块**，**图片管理模块**，都有用到可以review
4. `flow-attrs="{accept:'image/*'}"` **html5** 支持只允许上传图片  
