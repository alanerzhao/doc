/**
 * 创建按钮
 */

UM.registerUI('feed-emotion', function( name ){

    //该方法里的this指向编辑器实例

    var me = this,

        //实例化一个UMEDITOR提供的按钮对象
        $button = $.eduibutton({
            'icon': 'feed-emotion',
            //'title': me.options.lang === "zh-cn" ? "保存" : "save",
            'click': function(e){
                me.execCommand( name );
                 e.stopPropagation();

            }
        });

    //在这里处理保存按钮的状态反射
    me.addListener( "selectionchange", function () {

        //检查当前的编辑器状态是否可以使用save命令
        var state = this.queryCommandState( name );

        $button.edui().disabled( state == -1 ).active( state == 1 );

    } );

    //返回该按钮对象后， 该按钮将会被附加到工具栏上
    return $button;

});

