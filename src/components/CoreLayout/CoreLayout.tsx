import React, { memo } from 'react'
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Cookies from 'js-cookie';

import { IState } from '@/reducers/index'
import { IRoute } from '@/routes/routes'


function checkIsLogin():boolean {
  return Cookies.get('token') ? true : false
}

interface IProps {
  routes: IRoute[]
}

const CoreLayout: React.FC<IProps> = memo( (props: IProps) => {

  let {
    routes,
  }= props
  return (
    <div className='core-layout'>
      <Switch>
        {
          routes.map( (route: IRoute)  => {
            const { path, exact, auth, component } = route
            const Component = component as React.ElementType
            return <Route key={path + ''} exact={!!exact} path={path} render={(props: any) => {
              if (!auth) {
                return <Component {...props} />
              }

              if (checkIsLogin()) {
                return <Component {...props} />
              }
              return (<Redirect to='/login' />)
            }} />
          })
        }
      </Switch>
    </div>
  )
})

const mapStateToProps = (state: IState) => {
  return {
   
  }
}

const mapDispatchToProps = (dispatch: IDispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)