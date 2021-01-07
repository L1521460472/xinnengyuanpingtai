// 判断是否是合法的url
export const checkUrl = (url) => {
  const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
  const re = new RegExp(reg)
  return re.test(url)
}
