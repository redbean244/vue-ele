import request from '@/utils/request';
// import qs from 'qs'

/**
 * 获取地址
 * @params type
 * type:guess 获取默认地址
 * type:hot 获取热门地址
 * type:group 获取所有地址
 */
export function cities(params) {
  return request({
    url: '/v1/cities',
    method: 'get',
    params
  });
}

/**
 * 获取当前所在城市
 */
export function currentcity(number) {
  return request({
    url: '/v1/cities/' + number,
    method: 'get'
  });
}

/**
 * 获取搜索地址
 */
export function searchplace(cityid, value) {
  return request({
    url: '/v1/pois',
    method: 'get',
    params: {
      type: 'search',
      city_id: cityid,
      keyword: value
    }
  });
}

/**
 * 获取msite页面地址信息
 */
export function msiteAddress(geohash) {
  return request({
    url: '/v2/pois/' + geohash,
    method: 'get'
  });
}

/**
 * 获取msite页面食品分类列表
 */

export function msiteFoodTypes(geohash) {
  return request({
    url: '/v2/index_entry',
    params: {
      geohash,
      group_type: '1',
      'flags[]': 'F'
    }
  });
}
