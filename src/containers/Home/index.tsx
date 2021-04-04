import Loadable from 'react-loadable'
import React from 'react'

import PageLoading from '@/components/Loading/PageLoading'

export default Loadable({
  loader: () => import('./Home'),
  loading: () => <PageLoading />
});
