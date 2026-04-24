// 使用 asyncAdd 函数实现一个异步加法
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 500);
}

// 解决方案
// 1. 使用 promisify 将异步加法函数转换为返回 Promise 的函数
const promiseAdd = (a, b) => new Promise((resolve, reject) => {
  asyncAdd(a, b, (err, res) => {
    if (err) {
      reject(err) // 如果出错则 reject
    } else {
      resolve(res) // 否则 resolve
    }
  })
})

// 2. 串行处理：使用 reduce 函数依次计算所有数的和，返回一个 Promise
async function serialSum(...args) {
  return args.reduce((task, now) => 
    task.then(res => promiseAdd(res, now)), 
    Promise.resolve(0)
  ) // 初始值为 0
}

// 3. 并行处理：使用 Promise.all 并行计算所有数的和
async function parallelSum(...args) {
  if (args.length === 1) return args[0] // 如果只有一个参数，则直接返回它
  const tasks = []
  for (let i = 0; i < args.length; i += 2) { // 每次取两个数计算它们的和
    tasks.push(promiseAdd(args[i], args[i + 1] || 0)) // 如果只有一个数，则另一个参数为 0
  }
  const results = await Promise.all(tasks) // 使用 Promise.all 并行计算
  return parallelSum(...results) // 递归调用并行处理，直到只剩下一个数
}

// 测试
(async () => {
  console.log('Running...');
  const res1 = await serialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
  console.log(res1) // 65
  const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
  console.log(res2) // 65
  console.log('Done');
})()
