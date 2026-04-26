function limit(count, array, iterateFunc) {
  const tasks = []  // 存储所有任务的 Promise 对象
  const doingTasks = []  // 存储正在执行的任务的 Promise 对象
  let i = 0  // 任务数组的索引
  const enqueue = () => {  // 加入任务队列的函数
    if (i === array.length) {  // 如果任务全部加入队列，则返回一个 resolved 状态的 Promise
      return Promise.resolve()
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]))  // 使用 Promise.resolve().then 将迭代任务加入微任务队列，避免立即执行
    tasks.push(task)  // 将任务的 Promise 对象加入 tasks 数组中
    // doing 并不是自己调用自己，而是一个表示当前任务完成时的 Promise 对象。
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))  // 当任务完成时，从 doingTasks 数组中移出该任务的 Promise 对象
    doingTasks.push(doing)  // 将该任务的完成状态加入 doingTasks 数组中
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()  // 判断是否需要等待某个任务完成后再继续添加任务
    return res.then(enqueue)  // 如果还有任务没有开始执行，则继续添加任务
  };
  return enqueue().then(() => Promise.all(tasks))  // 在所有任务执行完成后，使用 Promise.all 返回所有任务的执行结果
}

// test
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
  console.log(res)  // 输出所有任务的执行结果
})
