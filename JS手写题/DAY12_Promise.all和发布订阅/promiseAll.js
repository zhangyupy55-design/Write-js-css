function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const res = []
    let len = promises.length
  	if(!len) resolve(res)
    function fulfill(idx, val) {
      res[idx] = val
      len--
      if(!len) {
        resolve(res)
      } 
    }

    promises.forEach((promise, idx) => {
      Promise.resolve(promise).then((val) => fulfill(idx, val)).catch(e => reject(e))
    })
  })
}
//字节二面的手写promiseAll，要求考虑到接收可迭代对象进行转换，还延伸出来问把可迭代对象转成数组有什么方法，感觉可以更新一下文档
function promiseAll(iterable) {
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
  Promise.reject('Rejected'),
  Promise.resolve('Third')
];

Promise.all(promises)
  .then(results => console.log(results))
  .catch(error => console.error(error));

const promises = [
  Promise.resolve('First'),
  Promise.reject('Rejected'),
  Promise.resolve('Third')
];

Promise.allSettled(promises)
  .then(results => console.log(results))
  .catch(error => console.error(error));
// res
[
  { status: 'fulfilled', value: 'First' },
  { status: 'rejected', reason: 'Rejected' },
  { status: 'fulfilled', value: 'Third' }
]
