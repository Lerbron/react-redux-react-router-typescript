import * as actionTypes from '@/actions/actionTypes'
import http from '@/utils/http'
import API from '@/api'

import { IListParams } from '@/containers/Home/Home'
import { INewsItem } from '@/reducers/test'


export function testNum(): IAction{
  return{
    type: actionTypes.TEST_NUM,
  }
}


// 获取news列表

function getNewsList(listInfo: INewsItem[]): IAction {
  return {
    type: actionTypes.GET_NEWS_LIST,
    payload: listInfo
  }
}

export function fetchConferenceList(params: IListParams) {
  return (dispatch: IDispatch) => {
		return new Promise( (resolve, reject) => {
      http.get(API.GET_NEWS, {params})
      
        .then(res => {

          console.log('res===>', res)
          if (res.data.error_code === 0) {
            dispatch(getNewsList(res?.data?.result?.data??[]))
            
            resolve && resolve(res.data.result)
          } else {
            reject && reject(res.data.result)
          }
        }, (err) => {
          err = JSON.parse(JSON.stringify(err))
          reject && reject(err)
        })
				.catch(err => {
          console.log(err);
          reject && reject(err)
				})
		})
	}
}