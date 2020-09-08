import React from "react"

interface MessageProps {
  children: React.ReactNode
  success?: boolean
  error?: boolean
  neutral?: boolean
}

const Message = ({ children, success, error }: MessageProps) => {
  return (
    <div
      className={
        "message " + (success ? "success" : error ? "error" : "neutral")
      }
    >
      <span>{children}</span>
    </div>
  )
}

export default Message
