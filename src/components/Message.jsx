import React, { useEffect } from 'react'

function Message({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, type === 'success' ? 3000 : 5000)

    return () => clearTimeout(timer)
  }, [type, onClose])

  const className = type === 'error' ? 'error-message' : 'success-message'

  return (
    <div className={`message ${className}`}>
      {message}
    </div>
  )
}

export default Message
