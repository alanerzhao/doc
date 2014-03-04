var Class = function() {
	var klass = function() {
		
        /* 在实例上调用init方法
         * 为什么要用apply是因为想给每个实例都绑定一个init初始化方法
         */
		
        this.init.apply(this, arguments);
	};

	//定义这个fn是为了方便 给实例添加属性或方法
	klass.fn = klass.prototype;

	//定义类的别名
	klass.fn.parent = klass;

    /*
    * 写在类或构造函数上的方法叫表静态方法是不能被实例共享的，在JS里并
    * 没有这个概念，是借用的Java等面向对象的语言
    */

	klass.extend = function(obj) {

		var extended = obj.extended;

		//拷贝属性
		for (var i in obj) {
			klass[i] = obj[i];
		};
		//回调函数对外提供类
		if (extended) extended(klass);
    }


    /*
     * 写在原型对象上的方法当然实例对象能拿到
     * 
     */

	klass.include = function(obj) {

		var include = obj.include;

		//拷贝属性
		for (var i in obj) {
			klass.fn[i] = obj[i];
		};
		//回调函数对外提供类
		if (include) include(klass);
    }
        // 初始化实例
		klass.fn.init = function(param) {
			console.log(param);
		};
		return klass;
	}
	var Person = new Class();

    //给类增加方法
    Person.extend({
        find: function () {} 
    })
    //给实例增加方法
    Person.include({
        find: function () {} 
    })
	var person = new Person("baozi");
	console.dir(person);

