function limit(count, array, iterateFunc) {
  const tasks = []  // 存储所有任务的 Promise 对象
  const doingTasks = []  // 存储正在执行的任务的 Promise 对象
  let i = 0  // 任务数组的索引
  const enqueue = () => {  // 加入任务队列的函数
    if (i === array.length) {  
      return Promise.resolve()
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]))
    tasks.push(task)  
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))  
    doingTasks.push(doing)  
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()  
    return res.then(enqueue)  
  };
  return enqueue().then(() => Promise.all(tasks))  
}

// test
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
  console.log(res)  // 输出所有任务的执行结果
})
