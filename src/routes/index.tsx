import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CoreLayout from '@/components/CoreLayout/CoreLayout'
import {routes} from './routes'

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <CoreLayout routes={routes} />
    </BrowserRouter>

  )
}

export default AppRoutes