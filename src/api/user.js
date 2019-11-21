import request from '@/utils/request';
// import qs from 'qs'

export function getCode(params) {
  return request({
    url: '/sys/contractor/getCode',
    method: 'get',
    params
  });
}
