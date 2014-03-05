var Class = function(parent) {
	var klass = function() {
		
        /* 在实例上调用init方法
         * 为什么要用apply是因为想给每个实例都绑定一个init初始化方法
         */
		
        this.init.apply(this, arguments);
	};


    if(parent) {
    
    /*
    * 定义一个临时构造函数，让这个临时构造函数的原型对象等于父类的原型对象
    * 再把临时构造函数的实例引用给类的原型对象上
    * 从此看出只有实例的属性会被继承
    */
     var subclass = function () {};
     subclass.prototype = parent.prototype;
     klass.prototype = new subclass;

    }

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
     */

	klass.include = function(obj) {

		var included = obj.included;

		//拷贝属性
		for (var i in obj) {
			klass.fn[i] = obj[i];
		};
		//回调函数对外提供类
		if (included) included(klass);
    }
        // 初始化实例
		klass.fn.init = function(param) {
            if(!param) {
            console.log("no")
            } else {
			console.log(param);
            }
		};
		return klass;
	}



	/*var Person = new Class();//{{{

    //给类增加方法
    Person.extend({
        classFind: function () {} 
    })

    //给实例增加方法
    Person.include({
        instanceFind: function () {} 
    })

    Person.include({
        included: function (klass) {
            console.log(klass)
        }
    })

    [>
    * 这样在类上就会多出来一个classFind
    * 在实例上多出一个instanceFind的方法
    * classFind是静态方法无法被实例调用到
    <]

	var person = new Person("baozi");

	console.dir(person);
*///}}}

var Animal = new Class;


/*
* 给类的实例添加breath方法
* */
Animal.include({
    breath:function () {
        console.log("breath");
    }
})
var Cat = new Class(Animal);

var tommy = new Cat
    //继承了Animal的breath方法
    tommy.breath()
//console.dir(tommy);
