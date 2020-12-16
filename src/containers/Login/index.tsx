import Loadable from 'react-loadable'
import React from 'react'

import PageLoading from '@/components/Loading/PageLoading.tsx'

export default Loadable({
  loader: () => import('./Login'),
  loading: () => <PageLoading />
});
