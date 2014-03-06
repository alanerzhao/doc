var Model = {
	inherited: function() {},
	created: function() {},
	prototype: {
		init: function() {}
	},
    extend: function(o){
        var extended = o.extended;
        for(var i in o) {
            this[i] = o[i];
        }
        if(extended) extended(this);
    },
    include: function(o){
        var included = o.included;
        for(var i in o) {
            this.prototype[i] = o[i];
        }
        if(included) included(this);
    },
	create: function() {

        //继承了Model对象
		var object = Object.create(this);
        //Model对象别名
		object.parent = this;
        //返回继承了model prototype的新对象
        object.prototype = object.fn = Object.create(this.prototype);

        object.created();
        this.inherited(object);
        return object;
	},

    init: function () {
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance,arguments);
        return instance;
    }
}
Model.include({
    init: function (attr) {
        if(attr) this.load(attr);
    },
    load: function (attr) {
        for(var name in attr) {
            this[name] = attr[name];
        }
    }
})
Model.extend({
    populate: function (values) {
        //debugger;
        this.records = {};
        for(var i in values) {
            var record = this.init(values[i]);
            record.newRecord = false;
            this.records[record.id] = record;
        }
    }
})
var User = Model.create();
var user = User.init();
console.log(user);
/*$.ajax({
    dataType:"json",
    url:"./data.json",
    success:function (data){
        User.populate(data);
        //console.log(data);
    },
    error:function () {
        console.log("error")
    }
})
*/
