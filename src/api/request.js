import axios from 'axios';
// import QS from 'qs';
const NETWORK_ERROR = '网络请求异常请重试。。。'
// 创建一个axios实例对象
const service = axios.create({
  baseURL: '/api'
})

// 请求前做一些事情
// service.interceptors.request.use((req) => {
//   // 可以自定义header   jwt-token
//   return req
// })

// 在请求之后做一些事情
service.interceptors.response.use((res) => {
  const { status, msg, data } = res
  if (status === 200) {
    return data
  } else {
    // 网络请求错误
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

// 封装的核心函数
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }
  return service(options)
}

export default request