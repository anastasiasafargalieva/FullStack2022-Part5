import React from 'react'

const Notification = ({ message, isError = false }) => {
  if (message === null) return null
  return <div className={isError ? 'error' : 'message'}>{message}</div>
}

export default Notification