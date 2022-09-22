import request from './request';
export default {
  getCityInfo(params) {
    return request({
      url: '/api/posts/cities',
      methods: 'get',
      data:params
    })
  }
}