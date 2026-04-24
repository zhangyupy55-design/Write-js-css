function Myinstanceof(left, right) {
  const prototype = right.prototype
  let proto = Object.getPrototypeOf(left)
  while(true) {
    if(proto === null) return false
    if(proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}