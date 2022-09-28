/**
 * a instanceof Object
 * 判断 Object 的 prototype 是否在 a 的原型链上。
 */

function myInstance (target,origin) {
    //获取 target 原型
    const proto = Object.getPrototypeOf(target)
    if (proto) {
        if (proto === origin) {
            return true
        } else {
            myInstance(proto,origin);
        }
    } else {
        return false
    }
    
}