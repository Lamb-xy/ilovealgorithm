// 手写 Promise.all()
Promise.prototype.myAll = (promiseArr) => {
    return new Promise((resolve, reject) => {
        // 首先返回一个 promise 对象
        if (!Array.isArray(promiseArr)) {
            reject('传入的必须是数组');
        }
        let res = [],
            count = 0;
        promiseArr.forEach((item, index) => {
            // 预防数组里面有元素不是 Promise 的情况
            Promise.resolve(item)
                .then((val) => {
                    res[index] = val;
                    count++;
                    if (count === promiseArr.length) {
                        resolve(res);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};
// 手写 Promise.race()
Promise.prototype.myRace = (promiseArr) => {
    return new Promise((resolve, reject) => {
        for (let item of promiseArr) {
            Promise.resolve(item).then(resolve, reject);
        }
    });
};
// 手写 Promise.any()
Promise.prototype.myAny = (promiseArr) => {
    return new Promise((resolve, reject) => {
        let res = [],
            count = 0;
        promiseArr.forEach((item, index) => {
            Promise.resolve(item).then(resolve, (err) => {
                res[index] = { status: 'rejected', val: err };
                count++;
                if (count === promiseArr.length) {
                    reject(new Error('没有promise成功'));
                }
            });
        });
    });
};
// 手写 Promise.allSettled()
Promise.prototype.myAllSettled = (promiseArr) => {
    return new Promise((resolve, reject) => {
        let res = [],
            count = 0;
        const processResult = (res, i, status) => {
            res[i] = { status, val: res };
            count += 1;
            if (count === promises.length) resolve(arr);
        };
        promiseArr.forEach((item, index) => {
            Promise.resolve(item).then(
                (res) => {
                    processResult(res, index, 'fulfilled');
                },
                (err) => {
                    processResult(err, index, 'fulfilled');
                },
            );
        });
    });
};


// 测试
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 延时一秒')
  }, 1000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3 延时两秒')
  }, 2000)
})

const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p5 rejected 延时1.5秒')
  }, 1500)
})
// 所有 Promise 实例都成功
Promise.myAllSettled([p1, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err)) 

// 有一个 Promise 失败
Promise.myAllSettled([p1, p2, p4])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));


// 所有 Promise 都失败
Promise.myAllSettled([p4, p5])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
