import request from '@/utils/request';
// import qs from 'qs'

export function cities(params) {
  return request({
    url: '/cities',
    method: 'get',
    params
  });
}
