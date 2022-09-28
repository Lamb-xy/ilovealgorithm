function Parent(MyName) {
    this.name = MyName;
    this.likeFood = ['水果', '鸡', '烤肉']; //这是私有属性，每个人喜欢不一定相同
}
Parent.prototype.getName = function () {
    return this.name;
};
let baba = new Parent('爸爸');
/**
 * 原型链继承
 * 缺点：
 * 1.不能传参
 * 2.当改变父类构造函数上的属性时子类会相互影响
 */

// function Child(MyName) {
//     this.name = MyName;
// }
// Child.prototype = new Parent();

// let chongqingChild = new Child('重庆孩子');
// let guangdongChild = new Child('广东孩子');
// chongqingChild.likeFood.push('花椒'); // 重庆孩子还喜欢吃花椒。。。
// //对比三者的likeFood
// console.log(baba.likeFood); //baba     ['水果', '鸡', '烤肉']
// console.log(chongqingChild.likeFood); //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
// console.log(guangdongChild.likeFood); //广东孩子  ["水果", "鸡", "烤肉", "花椒"]   也爱吃花椒了？
// console.log(chongqingChild.getName()); //重庆孩子

/**
 * 构造函数继承
 * 优点：解决原型链继承存在的问题
 * 缺点：只能继承父类构造函数上的属性和方法，不能继承父类原型上的属性和方法。
 */
// function Child(MyName) {
//     Parent.call(this, MyName);
// }
// let chongqingChild = new Child('重庆孩子');
// let guangdongChild = new Child('广东孩子');
// chongqingChild.likeFood.push('花椒');
// // 对比三者的likeFood
// console.log(baba.likeFood); //baba     ['水果', '鸡', '烤肉']
// console.log(chongqingChild.likeFood); //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
// console.log(guangdongChild.likeFood); //广东孩子  ['水果', '鸡', '烤肉']
// console.log(chongqingChild.getName()); //当调用父类方法时报错

/**
 * 组合式继承
 * 缺点：
 * 父类构造函数会被执行两次分别在 Parent.call(this) 和 Child.prototype = new Parent()，
 * 而且父类构造函数上的属性在子类自身和子类的原型上都存在，
 * 这导致执行了 delete 某个属性 只是删除了对象自身上的某个属性，根据原型链向上查找机制依然可以访问到。
 */
// function Child(MyName) {
//     Parent.call(this, MyName);
// }
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;
// let chongqingChild = new Child('重庆孩子', 18);
// let guangdongChild = new Child('广东孩子', 19);
// chongqingChild.likeFood.push('花椒');
// //对比三者的likeFood
// console.log(baba.likeFood); //baba     ['水果', '鸡', '烤肉']
// console.log(chongqingChild.likeFood); //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
// console.log(guangdongChild.likeFood); //广东孩子  ['水果', '鸡', '烤肉']
// console.log(chongqingChild.getName()); //重庆孩子

//寄生组合式继承
function Child(MyName) {
    Parent.call(this, MyName);
}
(function () {
    function Demo() {}
    Demo.prototype = Parent.prototype;
    Child.prototype = new Demo(); //也就是说共有属性和私有属性分离继承
    Child.prototype.constructor = Child;
})();
let chongqingChild = new Child('重庆孩子');
let guangdongChild = new Child('广东孩子');
chongqingChild.likeFood.push('花椒');
console.log(Parent.prototype === Child.prototype); //false
//对比三者的likeFood
console.log(baba.likeFood); //baba     ['水果', '鸡', '烤肉']
console.log(chongqingChild.likeFood); //重庆孩子  ["水果", "鸡", "烤肉", "花椒"]
console.log(guangdongChild.likeFood); //广东孩子  ['水果', '鸡', '烤肉']
console.log(chongqingChild.getName()); //重庆孩子
//ES6 Class
class Base {
    constructor(name) {
        this.name = name;
        this.school = 'xx大学';
        this.course = ['语文', '数学'];
        this.teacher = '王老师';
    }
    modifyTeacher(tName) {
        this.teacher = tName;
    }
}

class Student extends Base {
    constructor(name) {
        super(name);
        this.time = new Date();
    }
    addCourse(course) {
        this.course.push(course);
    }
}

var xiaoming = new Student('小明');
var xiaohong = new Student('小红');
