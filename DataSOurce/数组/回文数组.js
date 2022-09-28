let arr1 = [1,3,3,5,5,1];
function arrPdByAdd(arr) {
    // 次数
    let times = 0;
    // 头指针
    let head = 0;
    // 尾指针
    let last = arr.length - 1;
    while (head < last) {
        if (arr[head] === arr[last]) {
            head++;
            last--;
        } else if (arr[head] > arr[last]) {
            arr[last]++;
            arr[last - 1]++;
            times++;
            if ( arr[head + 1] < arr[last - 1]) {
                return -1;
            }
        } else {
            arr[head]++;
            arr[head + 1]++;
            times++;
            if ( arr[head + 1] > arr[last - 1]) {
                return -1;
            }
        }
    }
    return times;
}
console.log(arrPdByAdd(arr1));
