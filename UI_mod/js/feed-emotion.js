
//注册一个名为“feed-emotion”的插件
UM.plugins['feed-emotion'] = function () {

    var mofang_face_map = {//{{{
        '嘻哈' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_xiaha_9481465.png',
        '龇牙' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_ziya_2c94900.png',
        '受伤' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_shoushang_56c02f5.png',
        '大笑' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_daxiao_85572c2.png',
        '开心' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_kaixin_e68274a.png',
        '笑汗' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_xiaohan_50f11c1.png',
        '讥笑' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_jixiao_90dac1b.png',
        '天使' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_tianshi_dba4be0.png',
        '恶魔' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_emo_b5f33d7.png',
        '挑逗' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_tiaodou_eb53a90.png',
        '可爱' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_keai_cfb4134.png',
        '微笑' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_weixiao_66df40a.png',
        '满意' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_manyi_f7b49a1.png',
        '色心' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_sexin_3138a3a.png',
        '得意' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_deyi_ea1cd7e.png',
        '阴险' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_yinxian_dfc8dad.png',
        '平静' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_pingjing_42af35a.png',
        '淡定' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_danding_f0af606.png',
        '斜视' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_xishi_2819ad6.png',
        '尴尬' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_ganga_4156747.png',
        '失望' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_shiwang_f2f843c.png',
        '傲慢' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_aoman_a9dc4e2.png',
        '撇嘴' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_pizui_5924bde.png',
        '喜欢' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_xihuan_8be7916.png',
        '飞吻' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_feiwen_5e1d111.png',
        '喜爱' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_xiai_7e90fa9.png',
        '亲嘴' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_qinzui_670ec07.png',
        '快乐' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_kuaile_346ffba.png',
        '调皮' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_tiaopi_ba4c7ba.png',
        '吐舌' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_tushe_d64a42a.png',
        '失落' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_shiluo_c051da6.png',
        '伤心' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_shangxin_5280e71.png',
        '发怒' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_fanu_edff1ca.png',
        '生气' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_shengqi_1e5cee8.png',
        '纠结' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_jiujie_ce8fe76.png',
        '喷气' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_penqi_03b4ddc.png',
        '汗呐' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_hanna_eaade91.png',
        '张嘴' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_zhangzui_e0b1c6c.png',
        '意外' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_yiwai_aa26189.png',
        '恐怖' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_kongbu_c8b5f71.png',
        '大哭' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_daku_c4cf035.png',
        '生病' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_shengbin_2f18be2.png',
        '难过' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_naguo_6ac90c6.png',
        '挤笑' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_jixiao_45_9cbbeb0.png',
        '流泪' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_liulei_e82b024.png',
        '惊讶' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_jingya_f4d3f19.png',
        '期待' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_qidai_230ebe0.png',
        '冷汗' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_lenghan_e14a9f1.png',
        '惊悚' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_jingsun_5c05f23.png',
        '拒绝' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_jujue_e3c96db.png',
        '脸红' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_lianhong_595f92f.png',
        '睡觉' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_shuijiao_b83bb83.png',
        '冷静' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_lengjing_4a97155.png',
        '口罩' : 'http://sts0.mofang.com/statics/v4/face/img/emoji/emoji_kouzhao_02c0354.png'
    };

    var me = this;
    var init = false;
    var strFace = "";
    var list = [];
    

    for( var x in mofang_face_map){
        list.push({
            icon:mofang_face_map[x],
            labFace : '['+ x +']'
        });
    }

    if(init) {
        $("#facebox").show();
    } else {
        init = true;
        // 创建表情框子
        if($('#face').length<=0){//{{{
            strFace = '<div id="facebox" class="qqFace">' + '<table border="0" cellspacing="0" cellpadding="0"><tr>';

            for(var i=1; i< list.length; i++){
                var o = list[i];
                var imgSrc = o.icon;
                //imgSrc += "?r=" + Math.floor(Math.random() * 1000000000000);
                strFace += '<td><img class="emotion-item" data-face = "'+o.labFace+'"  src="' + imgSrc + '"/></td>';
                if( i % 15 == 0 ) strFace += '</tr><tr>';
            }

            strFace += '</tr></table></div>';

            $("body").append(strFace);
        }//}}}
    }
    
    UM.commands[ 'feed-emotion' ] = {
        execCommand: function (cmdName,name) {

            var meDom = $(".edui-btn-feed-emotion");
            var offset = meDom.offset(),
                top = offset.top +24;

                $('#facebox').css({
                    'top':top,
                    'left':offset.left - 6
                });

                $('#facebox').show();

            function inserItem() {//{{{
                $("#facebox").off().one("click",".emotion-item",function (event) {
                    var labface = $(this).attr("data-face");
                    me.execCommand( "inserthtml",labface);
                })
            }
            inserItem()

            $(document).click(function(){
                $('#facebox').hide();
            });
            return false;

        },
        queryCommandState: function (cmdName) {

            //在这里总是返回0， 这样做可以使保存按钮一直可点击
            return 0;
        },
        //声明该插件不支持“撤销／保存”功能， 这样就不会触发ctrl+z 和ctrl+y的记忆功能
        notNeedUndo: 1

    };

};
