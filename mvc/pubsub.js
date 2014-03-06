var Pubsub = {
    subscrib:function(ev,callback) {

        var calls = this._callbacks || (this._callbacks = {});
        /*
         *  calls = {};第一次得到第一个空对象
         */
            
         //存取对应事件传进来的回调函数
        /*
        * [{"wen":"fun"},{"list":"func"}]
        * */
        (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
        
        return this;
    },
    publish: function () {
        var args = Array.prototype.slice.call(arguments,0);

        var ev = args.shift();

        var list, calls, i, l;
        //console.log(this._callbacks)
        //如果不存在对应事件对象
        //如果不存在以地应事件对象回调方法
        if(!(calls = this._callbacks)) return this;
        if(!(list = this._callbacks[ev])) return this;

        //如果存在则调用执行
        for(i=0, l = list.length;i < l;i++) {

           list[i].apply(this,args);
            return this;
        }
    }
}
Pubsub.subscrib("wen",function () {
    console.log("wen");
}).subscrib("list",function () {
    console.log("list");
})
//Pubsub.publish("wen");
