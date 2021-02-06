// 判断是否是合法的url
export const checkUrl = (url) => {
  const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
  const re = new RegExp(reg)
  return re.test(url)
}


// 防抖函数
export const debounce = (fn, delay) => {
  let timer = null
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}


// 节流函数
export const throttle = (fn, delay) => {
  let vaild = true
  return function() {
    if (!vaild) {
      return false
    }
    vaild = false
    setTimeout(() => {
      fn()
      vaild = true
    }, delay)
  }
}
