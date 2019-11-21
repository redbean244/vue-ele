import axios from 'axios';
import router from '@/router';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
  // withCredentials: true // send cookies when cross-domain requests
});

// request interceptor
service.interceptors.request.use(
  config => {
    // get加上时间戳，防止IE缓存
    if (config.method === 'get') {
      config.params = {
        t: Date.parse(new Date()) / 1000,
        ...config.params
      };
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    console.log(res);
    switch (res.code) {
      case undefined:
      case 0:
        return res;
      default:
        // Message({
        //   message: res.msg || 'Error',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        return Promise.reject(new Error(res.message || 'Error'));
    }
  },
  err => {
    // 请求失败时，即status!=200
    if (err && err.response) {
      switch (err.response.status) {
        case 302:
          break;
        case 400:
          err.message = '错误请求';
          break;
        case 401:
          err.message = '登录已超时，请重新登录';
          router.push('/login');
          break;
        case 403:
          err.message = '禁止访问';
          break;
        case 404:
          err.message = '请求错误,未找到该资源';
          break;
        case 405:
          err.message = '请求方法未允许';
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 413:
          err.message = '上传文件过大';
          break;
        case 500:
          err.message = '服务器端出错';
          break;
        case 501:
          err.message = '网络未实现';
          break;
        case 502:
          err.message = '网络错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网络超时';
          break;
        case 505:
          err.message = 'http版本不支持该请求';
          break;
        default:
          err.message = `连接错误,${err.response.msg}`;
      }
    } else {
      err.message = '网络连接已断开，请稍后重试';
      router.push('/login');
    }

    return Promise.reject(err);
  }
);

export default service;
