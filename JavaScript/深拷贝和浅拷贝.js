function clone(target, map = new WeakMap()) {
    // 额外开辟一个存储空间WeakMap来存储当前对象
    if (target === null) return target; // 如果是 null 就不进行拷贝操作
    if (target instanceof Date) return new Date(target); // 处理日期
    if (target instanceof RegExp) return new RegExp(target); // 处理正则
    if (target instanceof HTMLElement) return target; // 处理 DOM元素
    if (typeof target !== 'object') return target; // 处理原始类型和函数 不需要深拷贝，直接返回
    // 区分数组和对象
    let cloneTarget = Array.isArray(target) ? [] : {};
    // 当需要拷贝当前对象时，先去存储空间中找，如果有的话直接返回
    if (map.get(target)) {
        return map.get(target);
    }
    // 如果存储空间中没有就存进 map 里
    map.set(target, cloneTarget);
    for (const key in target) {
        // 递归拷贝每一层
        cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
}
