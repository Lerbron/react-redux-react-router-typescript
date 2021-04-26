import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import {
  message
} from 'antd';
import Qs from 'qs'

let CancelToken= axios.CancelToken

interface IRequestConfig extends AxiosRequestConfig{
  noNeedCancel?: boolean,
}

interface IResponseConfig extends AxiosResponse{
  noNeedCancel?: boolean,
}


interface IPendingReq {
  [prop: string]: (params: any) => void
}

export const pendingReq: IPendingReq = {};


const http = axios.create({
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'repeat'
    })
  }
});

http.interceptors.request.use( (config: IRequestConfig)=> {
  let Authorization = Cookies.get('Authorization');
  config.headers = {
    ...config.headers,
  }

  // 频繁操作时，取消同一个接口的前一次请求
  if (!config.noNeedCancel) {
    const key = config.url + '&' + config.method;
    pendingReq[key] && pendingReq[key]('The operation is too frequent~');

    config.cancelToken = new CancelToken(c => {
      pendingReq[key] = c;
    });
  }

  if (Authorization) {

    config.headers = {
      ...config.headers,
      
    };
  }

  return config;
}, (error) => {
  // 对请求错误做些什么
  console.log('err:', error)
  return Promise.reject(error);
});

http.interceptors.response.use( (response: IResponseConfig) => {
  if (!response.noNeedCancel) {
    const key = response.config.url + '&' + response.config.method;
    pendingReq[key] && delete pendingReq[key];
  }
  return response;
}, err => {
  let errResponse = err.response||{}

  console.log('errObj:', err)

  if (err?.message == 'The operation is too frequent~' || err?.message == 'page unmount') {
    return Promise.reject('')
  }

  
  message.error(errResponse?.data && errResponse?.data?.error && errResponse?.data?.error?.message || errResponse?.statusText || 'Something went wrong, please try again later');
  return Promise.reject(errResponse);

})
export default http