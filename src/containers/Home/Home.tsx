import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router-dom'
import { testNum } from '@/actions/testActions'
import {IState} from '@/reducers/index'
import { IDispatch } from '@/typings/index'
import checkNum from '@/utils/test.tsx'
import imgUrl from '@/assets/icons/img.jpg'

interface IProps extends RouteComponentProps{
  num: number
  testNum(): void
}


const Home= (props: IProps) => {

  let {
    history,
    num,
    testNum,
  }= props

  const goAbout= () => {
    history.push('/about/3')
  }
  const add=() => {
    testNum()
  }

  useEffect(() => {
    let flag= checkNum(8)
    console.log("flag-->", flag)
  }, [])

  return <div>
    <div onClick={goAbout}>Home page</div>
    {num}
    <div onClick={add}>add</div>
    <img src={imgUrl} />
  </div>
}

const mapStateToProps = (state:IState, ownProps:IProps) => {
  return {
    num: state.test.num
  }
}

const mapDispatchToProps = (dispatch: IDispatch, ownProps:IProps ) => {
  return {
    testNum: () => {
      dispatch(testNum())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)