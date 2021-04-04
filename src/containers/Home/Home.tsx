import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router-dom'
import { testNum } from '@/actions/testActions'
import {IState} from '@/reducers/index'
import { IDispatch } from '@/typings/index'
import checkNum from '@/utils/test'
import imgUrl from '@/assets/icons/img.jpg'
import { fetchConferenceList } from '@/actions/testActions'
import { INewsItem } from '@/reducers/test'

import { Button } from 'antd'

interface IProps extends RouteComponentProps{
  num: number
  testNum(): void
  fetchConferenceList: (params: IListParams) => void
  newsList: INewsItem[]
}

export interface IListParams{
  key: string
  type?: string
  page?: number
  page_size?: number
}


const Home: React.FC<IProps>= (props: IProps) => {

  let {
    history,
    num,
    testNum,
    fetchConferenceList,
    newsList
  }= props

  const goAbout= () => {
    history.push('/about/3')
  }
  const add=() => {
    testNum()
  }

  const renderNewsList= () => {
    if (newsList.length == 0) return null

    return newsList.map(newsItem => (
      <li key={newsItem.uniquekey}>
        <a href={`${newsItem.url}`}>{newsItem.title}</a>
      </li>
    ))
  }

  useEffect(() => {
    let flag= checkNum(8)
    console.log("flag-->", flag)

    let params: IListParams= {
      key: '294b924ec8773fee518de6c90d08250d'
    }

    fetchConferenceList(params)

    
  }, [])

  return <div>
    <div onClick={goAbout}>Home page</div>
    {num}
    <div onClick={add}>add Number</div>
    <img src={imgUrl} />
    <Button type='primary'>Submit</Button>
    <ul>
      {renderNewsList()}
    </ul>

  </div>
}

const mapStateToProps = (state:IState, ownProps:IProps) => {
  return {
    num: state.test.num,
    newsList: state.test.newsList || []
  }
}

const mapDispatchToProps = (dispatch: IDispatch, ownProps:IProps ) => {
  return {
    testNum: () => {
      dispatch(testNum())
    },
    fetchConferenceList: (params: IListParams) => dispatch(fetchConferenceList(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)