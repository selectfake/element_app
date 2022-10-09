import request from './request';
export default {
  getCityInfo(params) {
    return request({
      url: '/api/posts/cities',
      method: 'get',
      data: params
    })
  },
  getImgData() {
    return request({
      url: '/api/profile/shopping',
      method: 'get',
    })
  },
  getFilter() {
    return request({
      url: '/api/profile/filter',
      method: 'get'
    })
  },
  getRestaurants(params) {
    return request({
      url: `/api/profile/restaurants/${params[0]}/${params[1]}`,
      method: 'post',
      data: params
    })
  }
}