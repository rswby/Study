/*对象通过引用传递,它们永远不会拷贝*/
var Y = require('underscore');
var _ = Y._;
function 拷贝对象(obj){
    var a = {};
    for(var x in obj){
        a[x] = obj[x]
    }
    return a;
}
var test = (function(){
    var num = 1;
    return function (str) {
        var a = '第'+num+'次测试: '+str+' ';
        var b ='一一一一一一一一一一一';
        var b = b + b + b;
        console.log(a + b.slice(a.length));
        num++;
    };
}());
var a={
    name:'xiao ming',
    age :20,
    say :function(){
        console.log(this.name + ' say hello');
    }
}
test('对象赋值为引用');
a.say();

var b = a;
b.name = 'da ming';
console.log(a.name);

var c = 拷贝对象(a);
test("拷贝对象");
c.name = 'xiao hong';
console.log(a.name);
c.name = 'da ming';


console.log(_.isEqual(a,c));

/*原型*/
/*以某个对象为原型创建的新对象 ==> 继承于*/
function 继承于(proto){
    var a = function () {};
    a.prototype = proto;
    return new a;
}
test('继承于');
var d = 继承于(c);

d.say();

function type(target){
    console.log(Object.prototype.toString.call(target));
}
test('类型');
type(继承于);
type([1,3,4]);
type(d);
type(1);
type('ni hao');
type(null);
type(undefined);
type(true);
type(new Date);

/*函数和对象的不同 函数特有:函数的上下文 函数的行为 函数创建时附带的prototype属性 */
/*函数最与众不同之处在于它们可以被调用*/

/*函数(执行时)可以访问自身的参数和变量,也可以访问(定义时)
其外层的所有的变量,但不可以访问子级的变量.这叫做函数的上下文*/
/*在js中通过函数字面量创建的的函数对象包含一个连到外部上下文的连接,叫做闭包*/

/*不要把this和函数上下文混淆在一起*/

/*函数会有两个额外的参数arguments和this
**this的值取决于函数的调用模式
在JavaScript中共有四种调用模式:方法调用模式,函数调用模式,构造器调用模式和apply/call调用模式*/

/*()调用运算符,用在函数表达式后面,执行函数的行为,优先级和.[]并列第一序列,叫做调用表达式*/

/*当一个函数被保存为对象的的一个属性时,我们称它为一个方法.
当一个方法被调用时,this被绑定到它所属的对象.
如果一个调用表达式包含一个属性存取表达式(即一个.点表达式或[subscript]下标表达式),那么它被当做一个方法来调用,this绑定到函数所属于的对象*/
/*对于通过this改变所属对象上下文(也就是对象的属性)的方法称为公共方法*/

/*当一个函数并非对象的一个属性时,那么它被当做一个函数来调用
当函数按照此模式调用时,this被绑定到全局对象*/

/*是语言设计的一个错误,使方法不能利用内部函数来帮助它工作,因为this绑定到了全局对象,不能和方法共享对对象的访问权,规定在方法中用that代替this,方法内部函数就可以通过that来访问对象*/
test('函数调用模式');
var a={};
a.b={
    name:'xiao ming',
    say :function () {
        console.log('hello');
    },
    print:function () {
        console.log(this);
        function child() {
//            console.log(this);
        }
        child();
    }

}

a.b.print();
test("额外收获")
console.log(this);
(function () {
//   console.log(this); /*东西太多先注释*/
}());
/*额外收获 直接打印this不会打印全局详细信息,在嵌套中可以打印出全局信息的详细情况*/

/*构造器调用模式 如果在一个函数前面加上new来调用,那么将创建一个隐藏连接到该函数的prototype成员的新对象,同时this将会绑定到那个新对象上   new前缀也会改变return语句的行为*/
/*目的就是结合new前缀调用的函数被称为构造器函数.按照约定,它们保存在以大写格式命名的变量里,因为如果运行时没在前面加上new不会警告也不会报错,所以约定非常重要*/
test("构造器调用模式");
var A = function() {
    this.a = 1;
    this.b = 2;
}
A.prototype.say = function () {
    console.log('my property are '+this.a+this.b);
}

var b = new A();
console.log(b.a + b.b);
console.log(b.say());
var c = A();//c为undefined
/*console.log(c.a);
console.log(c.b);
console.log(c.say);*/

/*apply/call 调用模式允许我们选择this的值,把this绑定的对象作为第一个参数传入*/
test("测试改变绑定调用模式 沿用前面测试");
var c = {
    a:2,
    b:1
};
A.prototype.say.call(c);

/*函数中额外另给的arguments参数并不是一个真正的数组,只是一个类似数组的对象包括可以下标取值,还有length属性,但缺少数组的方法*/

/*一个函数总会返回一个值,乳沟没指定返回值,则返回undefined
如果函数前面加上new操作符,切返回值不是一个对象,则返回this(该新对象)*/
test("测试函数返回值的改变");
var A=function(){
    this.a = 1;
    this.b = 2;
    return 1;
}

var c = new A();
type(c);
console.log(c.a + c.b);

/*给Object.prototype添加方法来使得该方法对所有的对象可用,同样的可以给Function String Array Json Date RegExp Boolean Number等的Prototype添加方法,使之对所有的对应对象都可以使用*/
test("给对象原型添加属性,使之对其所有实例对象都可以使用")
Function.prototype.method=function(name,func){
    if(!this.prototype[name]){
        this.prototype[name]=func;
    }
    return this;
}

Number.method('integer',function(){
    return Math[this>0?'floor':'ceil'](this);
    //这里操作函数名
});

console.log((-10/3).integer());

/*通过给基本类型增加方法,可以大大提高语言的表现力,基本类型的原型是公共的结构,在类库混用时务必小心*/

/*递归*/
test("汉诺塔问题");
function 汉诺塔(disc,fir,sec,thr) {
    if(disc>0){
        汉诺塔(disc-1,fir,thr,sec);
        console.log('移动第'+disc+"盘子从第"+fir+'根柱子到第'+thr+'根柱子');
        汉诺塔(disc-1,sec,fir,thr);
    }
}

汉诺塔(3,'一',"二",'三');

/*递归函数可以高效的处理树形结构,不如浏览器的文档对象模型DOM*/
/*给定节点,便利包括该节点的所有后面的节点*/
function 递归节点(node,func) {
    func(node);
    node = node.firstChild;
    while(node){
        递归节点(node,func);
        node=node.nextSibling;
    }
}

/*尾递归:是一种在函数的最后执行递归调用语句的特殊形式的递归,这种递归可以被替换为一个循环,可以显著提高速度,并且深度递归不会因为栈溢出而失败*/
/*js并没有提供尾递归优化*/
test('尾递归优化');
var factorial=function factorial(i,a){
    a = a || 1;  //这里默认参数
    if(i < 2){
        return a;
    }
    return factorial(i - 1,a * i);
}

/*尾递归优化*/

var result=function (i,a) {
    for(a=a||1;i>=2;i--)
        a=a*i;
    return a;
}

console.log(factorial(4));
console.log(result(4));

/*作用域*/
test("作用域测试1");//函数声明优先级高于变量声明
type(sy);
function sy(){}
var sy = 1;
type(sy); //动态变量的性质,上一步进行了赋值

test("作用域测试2");
sy2();//同名函数声明,越后面优先级越高
function sy2() {
    console.log('appear first');
}
function sy2(){
    console.log('appear second');
}
sy2();

test("作用域测试3");//变量声明冲突无所谓的,未执行到赋值语句,变量都是undefined
//注意,对于用var声明的变量,再起赋值语句前面调用时,它的值为undefined,如果没有用var声明的变量在其赋值语句之前调用会报错
type(sy3);
var sy3 = 1;
var sy3 = null;
type(sy3);

test("作用域测试4");//就和普通变量没啥不同
type(sy4);
var sy4=function(){
    console.log("给变量赋值的匿名函数");
}
type(sy4);

test("作用域测试5");
type(sy5);
/*type(aa);*/

var sy5=function aa(){
    console.log("给变量赋值而且有名字的函数");
}
type(sy5);
/*type(aa);*///有名字也没法访问

/*JavaScript不支持块作用域,支持函数作用域*/

/*作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量(除了this和arguments)*/

/*通过返回内部函数,使内部函数可以被外界访问,而内部函数又有访问其外部函数的参数和变量,而且有弊内部函数更长的生命周期*/
/*不但可以返回内部函数,还可以返回包含内部函数的对象,总是自己限制自己的思维*/
/*闭包实例*/
/*闭包访问的并不是外部函数参数和变量的一个拷贝,访问的是参数和变量的本身*/
var myObject=(function(){
    var value = 0;
    return{
        increament:function (a) {
            value+=typeof a ==='number'?a:1;
        },
        getValue:function () {
            return value;
        }
    };
}());

/*当创建对象的函数被设计成无需和new配合使用时,首字母不必大写*/
/*定义一个函数,它设置一个DOM节点为黄色,然后把它渐变为白色*/

var fade=function(node){
    var leval = 0;
    function step(){
        var hex = leval.toString(16);
        node.backgroundColor='#ffff'+hex+hex;
        if(leval<15){
            leval+=1;
            setTimeout(step,100);
        }
    }
    step();
}
/*外部的变量啊函数啊最后都会归到window上，为了节约资源把不需要的属性或方法赋值为null，可用于垃圾回收,js垃圾回收的方式是标记回收,可以访问到的不会回收,访问不到的对象会被标记一个状态,一定时间间隔后,会被垃圾收集器回收,释放内存*/

/*用setTimeout预定自己再次运行,延长生命周期*/

/*函数的声明,后面声明会覆盖前面的,而变量同名被忽略.函数的声明优先级高,(但里面的内容不会被关心),直到函数被调用时函数内部在形成自己的词法环境,按照规定的语法规则执行*/

/*设置节点事件处理程序的两种方式*/
