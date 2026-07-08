function myAll(promises) {
  return new Promise((resolve, reject) => {
    const res = []
    let count = 0 // 记录成功完成的 promise 数量
    const len = promises.length

    // 边界：空数组直接 resolve
    if (!len) resolve(res)

    // 遍历所有异步任务
    promises.forEach((p, index) => {
      // 统一转成 Promise，防止数组里放普通数字/字符串
      Promise.resolve(p)
        .then((value) => {
          // 按原数组下标存入结果，保证顺序不乱
          res[index] = value
          count++
          // 全部都成功了，才把结果数组抛出去
          if (count === len) {
            resolve(res)
          }
        })
        .catch((err) => {
          // 任意一个失败，直接整体 reject，终止
          reject(err)
        })
    })
  })
}




//字节二面的手写promiseAll，要求考虑到接收可迭代对象进行转换，还延伸出来问把可迭代对象转成数组有什么方法，感觉可以更新一下文档
function promiseAllbig(iterable) {
  // 核心：将 可迭代对象 转换为数组（
  const promises = Array.from(iterable);
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    const len = promises.length;

    // 空可迭代对象直接返回
    if (len === 0) {
      resolve(result);
      return;
    }

    promises.forEach((promise, index) => {
      // 包装非Promise值，保持原生行为
      Promise.resolve(promise)
        .then((val) => {
          result[index] = val;
          count++;
          // 全部完成后resolve
          if (count === len) {
            resolve(result);
          }
        })
        .catch(reject); // 任意失败直接终止
    });
  });
}

Promise.allSettled = function(promises) {
  return new Promise((resolve) => {
    const results = promises.map((promise) => {
      return promise.then(
        (value) => {
          return { status: 'fulfilled', value };
        },
        (reason) => {
          return { status: 'rejected', reason };
        }
      );
    });

    Promise.all(results).then((settledResults) => {
      resolve(settledResults);
    });
  });
};

const promises = [
  Promise.resolve('First'),
  Promise.resolve('Rejected'),
  Promise.resolve('Third')
];

promiseAllmini(promises)
  .then(results => console.log(results))
  .catch(error => console.error(error));



// Promise.allSettled(promises)
//   .then(results => console.log(results))
//   .catch(error => console.error(error));
// // res
// [
//   { status: 'fulfilled', value: 'First' },
//   { status: 'rejected', reason: 'Rejected' },
//   { status: 'fulfilled', value: 'Third' }
// ]
