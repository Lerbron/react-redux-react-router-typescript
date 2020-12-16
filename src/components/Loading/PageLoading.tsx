import React, { memo } from 'react';
import './loading.scss'

const PageLoading: React.FC= memo(() => (
  <div className='modal-container'>
    <div className='loader'>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
  </div>
))

export default PageLoading