define("upload",["jquery"],function(require, exports, module) {
    var $ = require("jquery");
    // 图片上传demo
    $(function() {
    var $ = jQuery,
        $list = $('#fileList'),
        $btn = $('#ctlBtn'),
        state = 'pending',
        getData = "",
        arrData = [];

        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio,

        // Web Uploader实例
        uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 自动上传。
        auto: false,
        // swf文件路径
        swf: './Uploader.swf',
        fileNumLimit: 5,
        fileSizeLimit: 10 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 1024 * 1024, //50 * 1024 * 1024,    // 50 M

        // 文件接收服务端。
        server: 'http://feed.test.mofang.com/upload/image',
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

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        arrData.length = 0;
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                    '<div class="info">' + file.name + '</div>' +
                    '<a href="javascript:;" class="remove-this">X</a>' +
                '</div>'
                ),
            $img = $li.find('img');


            $li.on('click', '.remove-this', function() {
                $(this).parents("#"+file.id+"").fadeOut();
                //console.log(file.id)
                uploader.removeFile( file.id );
            })
         $btn.removeClass("ok-disabled");

        $list.append( $li );

        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, thumbnailWidth, thumbnailHeight );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file,ret ) {
         var $li = $( '#'+file.id ),
            $error = $li.find('div.success');
            $btn.addClass("ok-disabled");
            //response
            if(ret && ret.data) {
                arrData.push(ret.data.url);

            }

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="success"></div>').appendTo( $li );
        }
        //$error.text('上传成功');
    });

    // 文件上传失败，现实上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });
    uploader.on("error",function (type) {

        switch (type) {
            case 'Q_EXCEED_NUM_LIMIT':
            alert("最多上传4张")
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
                //console.log("error")
        }
    })
     $btn.on( 'click', function() {
        if ( $(this).hasClass( 'ok-disabled' ) ) {
            //console.log("ok")
            return false;
        }
        if ( state === 'uploading' ) {
            uploader.stop();
        } else {
            uploader.upload();
        }
    });
    })
    if (typeof module != "undefined" && module.exports) {
        module.exports = $;
    }
});
seajs.use("upload");
