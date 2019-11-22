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
    url: '/cities',
    method: 'get',
    params
  });
}

/**
 * 获取当前所在城市
 */
export function currentcity(number) {
  return request({
    url: '/cities/' + number,
    method: 'get'
  });
}

/**
 * 获取搜索地址
 */
export function searchplace(cityid, value) {
  return request({
    url: '/pois',
    method: 'get',
    params: {
      type: 'search',
      city_id: cityid,
      keyword: value
    }
  });
}
