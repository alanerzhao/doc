    /**上传组件**/
    $(function() {
        var flag = false;
        var up_flag = false;
        var $list = $('#fileList'),
            $btn = $('#ctlBtn'),
            state = 'pending',
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth = 100 * ratio,
            thumbnailHeight = 100 * ratio,

        // Web Uploader实例

        /** 初始化Web Uploader **/
        uploader = WebUploader.create({
            // 自动上传。
            auto: true,
            //runtimeOrder: 'flash',
            // swf文件路径
            swf: '/css/Uploader.swf',
            //fileNumLimit: 5,//$("#fileList").attr("data-num"),
            //fileSizeLimit: 10 * 1024 * 1024,    // 200 M
            //fileSingleSizeLimit: 1024 * 1024, //50 * 1024 * 1024,    // 50 M

            // 文件接收服务端。
            server: "http://" + window.location.host + '/upload/image',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker',
            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });

        uploader.on( 'uploadBeforeSend', function( block, data ) {
            // block为分块数据。
            // file为分块对应的file对象。
            var file = block.file;
            // 修改data可以控制发送哪些携带数据。
            data.uid = window.location.href;
            // 将存在file对象中的md5数据携带发送过去。
            // data.fileMd5 = file.md5;
            // 删除其他数据
            // delete data.key;
        });
        uploader.on("beforeFileQueued",function() {//{{{
            $(".upload-tips").show();
            if($("#fileList").children().length >=10) {
                if(flag == false) {
                    flag = true;
                    uploader.stop()
                    tips.init({ text: "最多上传10张图片"})


                }
                return false;
            } else {
                flag = false;
            }
        })//}}}
        // uploader.on("beforeFileQueued",function() {//{{{
        //    if($("#fileList").children().length >=10) {
        //        if($("#fileList").children().length==10) {
        //            alert("最多上传10张图片");
        //        }
        //        return false;
        //    }
        //})//}}}
        // 当有文件添加进来的时候
        uploader.on( 'fileQueued', function( file ) {//{{{
            //重置数据
            //arrData.length = 0;
            var strHtml = "";
            //console.log(file)
            //垃圾处理
             if($.browser.version == "6.0") {
               strHtml = '<div id="' + file.id + '" class="item">' +
                    '<h4 class="info">' + file.name + '</h4>' +
                    '<p class="state">正在上传...</p>' +
                '</div>';

             } else {
                strHtml = '<div id="' + file.id + '" class="file-item thumbnail">' +
                                '<img>' + '<div class="info">' + file.name + '</div>' +
                                '<a href="javascript:;" class="remove-this">X</a>' +
                          '</div>';
            }
            var $li = $(strHtml);
            var $img = $li.find('img');

            /**删除队列id**/
            $li.on('click', '.remove-this', function() {
                uploader.removeFile( file.id );
                $(this).parents("#"+file.id+"").fadeOut().remove();

                var newVal = $(this).parent().attr("data-url");
                var picVale = pic.val().split(",");
                arrData = replaceArr(picVale,newVal);
                pic.val(arrData);
            })

            $btn.removeClass("ok-disabled");
            $list.append( $li );
            // 创建缩略图
            if($.browser.version != "6.0") {
                uploader.makeThumb( file, function( error, src ) {
                    if ( error ) {
                        $img.replaceWith('<span>不能预览</span>');
                        return;
                    }

                    $img.attr( 'src', src );
                }, thumbnailWidth, thumbnailHeight );
            }
        });//}}}
        //上传中
        uploader.on("uploadProgress",function( file, percentage ) {//{{{
            up_flag = true;
            if(up_flag) {
                reply.attr("disabled",true).css("background","#ccc");
                up_flag = false;
            }
        });//}}}
        //上传完成
        uploader.on("uploadFinished",function( file, percentage ) {//{{{
            reply.attr("disabled",false).css("background","#f4971e");
        });//}}}
        /** 文件上传成功 **/
        uploader.on( 'uploadSuccess', function( file,ret ) {//{{{
             var $li = $( '#'+file.id ),
                $error = $li.find('div.success');
                $btn.addClass("ok-disabled");
                $( '#'+file.id ).find('p.state').text('已上传');
                feedFlag = 1;
                //response
                if(ret && ret.data) {
                if(pic.val() != ""){
                    arrData = pic.val().split(",");
                }else{
                    arrData = [];
                }
                arrData.push(ret.data.url);
                pic.val(arrData)
                $li.attr("data-url",ret.data.url)
            }
              if($.browser.version != "6.0") {
                // 避免重复创建
                if ( !$error.length ) {
                    $error = $('<div class="success"></div>').appendTo( $li );
                }
              }

        });//}}}
        /** 文件上传失败，现实上传出错。**/
        uploader.on( 'uploadError', function( file ) {//{{{
            var $li = $( '#'+file.id ),
                $error = $li.find('div.error');

            // 避免重复创建
                if ( !$error.length ) {
                    $error = $('<div class="error"></div>').appendTo( $li );
                }
            $error.text('上传失败');
        });//}}}
        /**出错监听**/
        uploader.on("error",function (type) {//{{{
            switch (type) {
                case 'Q_EXCEED_NUM_LIMIT':
                alert("最多上传"+$("#fileList").attr("data-num")+"张")
                    break;
                case 'Q_EXCEED_SIZE_LIMIT':
                alert("图片过大")
                    break;
                case 'Q_TYPE_DENIED':
                    alert("请上传图片文件")
                    break;
                case 'F_DUPLICATE':
                    alert("重复文件")
                    break;
                default:
                    alert("上传出错")
            }
        })//}}}

        $btn.on( 'click', function() {
            if ( $(this).hasClass( 'ok-disabled' ) ) {
                return false;
            }
            if ( state === 'uploading' ) {
                uploader.stop();
            } else {
                uploader.upload();
            }
        });
        $(".editor-remove-this").click(function() {
            var newVal = $(this).parent().attr("data-url");
            $(this).parent().remove();
            var picVale = pic.val().split(",");
            editorArrData = replaceArr(picVale,newVal);
            pic.val(editorArrData);
        })

    })

