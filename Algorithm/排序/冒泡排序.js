/**
 * 循环数组，比较当前元素和下一个元素
 * 时间复杂度：O(n2)
 * 空间复杂度:O(1)
 * 稳定
 */
 function bubbleSort(array) {
     for (let j = 0; j < array.length; j++) {
         for (let i = 0; i < array.length - 1 - j; i++) {
             // 比较相邻数
             if (array[i] > array[i + 1]) {
                 [array[i], array[i + 1]] = [array[i + 1], array[i]];
             }
         }
     }
     return array;
}
 