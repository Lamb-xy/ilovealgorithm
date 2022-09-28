// 实现 call
Function.prototype.myCall = function (context = window, ...args) {
    // 保证不会重名属性
    let fn = Symbol(context);
    context[fn] = this;
    // 执行函数
    let result = context[fn](...args);
    // 删除函数
    delete context[fn];
    return result;
};
// 实现 apply:和 call的区别就是传参方式
Function.prototype.myApply = function (context = window, args) {
    // 保证不会重名属性
    let fn = Symbol(context);
    context[fn] = this;
    // 执行函数
    let result;
    // 传给函数的参必须是数组形式
    if (Array.isArray(args)) {
        result = context[fn](...args);
    } else {
        result = context[fn]();
    }
    // 删除函数
    delete context[fn];
    return result;
};

// 实现 bind：绑定this，返回函数，不立即执行
Function.prototype.myApply = function (context, ...args1) {
    //返回一个绑定this的函数，我们需要在此保存this
    let _this = this;
    return function (...args2) {
        return _this.apply(context, args1.concat(args2));
    };
};

