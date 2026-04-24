function myNew(fn, ...args) {
  if(Object.prototype.toString.call(fn) !== "[object Function]") {
    return "Error in params"
  }
  const obj = Object.create(fn.prototype)
  let res = fn.call(obj, ...args)
  return res instanceof Object ? res : obj
}