import React from 'react'
import Home from '@/containers/Home'
import About from '@/containers/About'
import Login from '@/containers/Login'
import { LoadableComponent } from 'react-loadable'
import { RouteComponentProps } from 'react-router-dom'

export interface IRoute{
  path: string,
  exact: boolean,
  auth: boolean,
  component: React.ComponentType<RouteComponentProps<any>>| React.ComponentType<any> | LoadableComponent| React.FC<any>
}

export const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    auth: false
  },
  {
    path: '/about/:id',
    exact: true,
    component: About,
    auth: true
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    auth: false
  }
]