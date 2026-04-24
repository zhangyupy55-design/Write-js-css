// map函数
Array.prototype.Mymap = function(fn){
  const res = []
  for(let i = 0; i < this.length; i++) {
    res.push(fn(this[i], i, this)) 
  }
  return res
}

// filter函数
Array.prototype.Myfilter = function(fn){
  const res = []
  for(let i = 0; i < this.length; i++) {
    if(fn(this[i], i, this)) {
      res.push(this[i])
    }
  }
  return res
}

// reduce函数
Array.prototype.Myreduce = function(fn, initValue){ 
  let res = 0
  let start = 0
  if(arguments.length !== 1){
    start = 1
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
