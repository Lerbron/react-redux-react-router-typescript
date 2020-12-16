import React from 'react'
import { RouteComponentProps } from 'react-router-dom'


import './index.scss'

interface RouteParams {
  id: string
}
interface IProps extends RouteComponentProps<RouteParams>{
  
}

export default (props: IProps) => {
  let {
    history,
    match
  }= props

  const goHome= () => {
    history.push('/')
  }

  console.log('id-->', match)

  return <div>
    <div onClick={goHome}>About page <span>{match?.params?.id}</span></div>
  </div>
}