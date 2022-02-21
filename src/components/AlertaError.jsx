import React from 'react'

const AlertaError = ({error}) => {
  return (
    <div className='text-xs text-red-600'>
        { error }
    </div>
  )
}

export default AlertaError