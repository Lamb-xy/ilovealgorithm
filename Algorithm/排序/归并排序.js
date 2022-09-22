/**
 * 思想：分治法
 * 分割：
 * 将数组从中点进行分割，分为左、右两个数组
 * 递归分割左、右数组，直到数组长度小于2
 * 归并：
 * 如果需要合并，那么左右两数组已经有序了。
 * 创建一个临时存储数组temp，比较两数组第一个元素，将较小的元素加入临时数组
 * 若左右数组有一个为空，那么此时另一个数组一定大于temp中的所有元素，直接将其所有元素加入temp
 *
 * 复杂度：
 * 时间复杂度：O(nlogn)
 * 空间复杂度:O(n)
 * 稳定
 */

// 方法1:分割数组时直接将数组分割为两个数组，合并时直接合并数组。
function mergeSort1(array) {
    if (array.length < 2) {
        return array;
    }
    const mid = Math.floor(array.length / 2);
    const front = array.slice(0, mid);
    const end = array.slice(mid);
    return merge1(mergeSort1(front), mergeSort1(end));
}

function merge1(front, end) {
    // 创建一个临时存储数组
    const temp = [];
    while (front.length && end.length) {
        // 比较两数组第一个元素，将较小的元素加入临时数组
        if (front[0] < end[0]) {
            temp.push(front.shift());
        } else {
            temp.push(end.shift());
        }
    }
    // 若左右数组有一个为空，那么此时另一个数组一定大于temp中的所有元素，直接将其所有元素加入temp
    while (front.length) {
        temp.push(front.shift());
    }
    while (end.length) {
        temp.push(end.shift());
    }
    return temp;
}

// 方法2：记录数组的索引，使用left、right两个索引来限定当前分割的数组。
function mergeSort2(array, left, right, temp) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort2(array, left, mid, temp);
        mergeSort2(array, mid + 1, right, temp);
        merge2(array, left, right, temp);
    }
    return array;
}

function merge2(array, left, right, temp) {
    const mid = Math.floor((left + right) / 2);
    let leftIndex = left;
    let rightIndex = mid + 1;
    let tempIndex = 0;
    while (leftIndex <= mid && rightIndex <= right) {
        if (array[leftIndex] < array[rightIndex]) {
            temp[tempIndex++] = array[leftIndex++];
        } else {
            temp[tempIndex++] = array[rightIndex++];
        }
    }
    while (leftIndex <= mid) {
        temp[tempIndex++] = array[leftIndex++];
    }
    while (rightIndex <= right) {
        temp[tempIndex++] = array[rightIndex++];
    }
    tempIndex = 0;
    for (let i = left; i <= right; i++) {
        array[i] = temp[tempIndex++];
    }
}
