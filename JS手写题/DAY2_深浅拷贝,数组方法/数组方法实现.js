Array.prototype.map = function(fn) {
  const res = []
  for(let i = 0; i < this.length; i++) {
    res.push(fn(this[i], i, this)) 
  }
  return res
}

Array.prototype.filter = function(fn) {
  const res = []
  for(let i = 0; i < this.length; i++) {
    if(fn(this[i], i, this)) {
      res.push(this[i])
    }
  }
  return res
}


Array.prototype.reduce = function(fn, initValue) {
  let res, start = 0
  if(arguments.length !== 1) {
    res = initValue
  } else {
    res = this[0]
    start = 1
  }
  for(let i = start; i < this.length; i++) {
    res = fn(res, this[i], i, this)
  }
  return res
}