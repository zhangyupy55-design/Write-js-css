// xhr请求
const xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return;
  if (this.status === 200) {
    console.log(this.response);
  } else {
    throw new Error(xhr.statusText);
  }
};
xhr.send();

//fetch请求
fetch(url, {
  method: 'POST',         // 指定方法：POST / PUT / DELETE
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({  // 要传给后端的数据
    username: 'zs',
    password: '123'
  })
})
.then(res => res.json())
.then(data => console.log(data))

//axios请求
axios.get(url)
  .then(res => {
    console.log(res.data) // 数据直接在 res.data 里
  })
  .catch(err => {
    console.log('出错了', err)
  })
