const parseUrl = (url) => {
  const tmpUrl = url.split("?")[1]
  const resObj = {}
  for(const str of tmpUrl.split("&")) {
    let [key, value] = str.split("=")
    //把 URL 编码的内容还原，比如 %E5%BC%A0%E4%B8%89 还原成 张三
    value = decodeURIComponent(value)
    if(resObj.hasOwnProperty(key)) {
      resObj[key] = [].concat(resObj[key], value)
    } else if(value == "undefined") { // !!!
      resObj[key] = true
    } else {
      resObj[key] = value 
    }
  }
  return resObj
}