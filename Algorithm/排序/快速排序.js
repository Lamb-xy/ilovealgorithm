/**
 * 1.选择一个基准元素 target(一般选第一个元素)
 * 2.将比 target 小的元素移到它左边，比 target 大的元素移到它右边
 * 3.分别对 target 左侧和右侧元素执行1,2操作
 * 思想：分治+递归
 * 复杂度：
 * 时间复杂度：平均O(nlogn)，最坏O(n2)，实际上大多数情况下小于O(nlogn)
 * 空间复杂度:O(logn)（递归调用消耗）
 * 不稳定
 */

// 开辟存储空间 left 和 right
function quickSort1(arr) {
    if (arr.length < 2) {
        return arr;
    }
    const target = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < target) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort1(left).concat(target, quickSort1(right));
}

// 记录索引 l 从数组最左侧 ，记录索引 r 从数组右侧
function quickSort2(array, start, end) {
    if (end - start < 1) {
        return;
    }
    const target = array[start];
    let l = start;
    let r = end;
    while (l < r) {
        while (l < r && array[r] >= target) {
            r--;
        }
        array[l] = array[r];
        while (l < r && array[l] < target) {
            l++;
        }
        array[r] = array[l];
    }
    array[l] = target;
    quickSort2(array, start, l - 1);
    quickSort2(array, l + 1, end);
    return array;
}
