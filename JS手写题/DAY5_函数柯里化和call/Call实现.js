Function.prototype.call = function(thisArg, ...args) {
  const fn = this
  // 防止原始类型 如果指定的对象是原始类型（如字符串、数字、布尔值等），则会自动进行对象的转换，将其转换为对应的包装对象（如String、Number、Boolean等）。
  thisArg = thisArg !== undefined && thisArg !== null ? Object(thisArg) : window
  const tag = Symbol("call")
  thisArg[tag] = fn
  const res = thisArg[tag](...args)
  delete thisArg[tag]
  return res
}