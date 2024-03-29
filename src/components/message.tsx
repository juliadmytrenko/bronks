import React from "react"

interface MessageProps {
  className?: string
  children: React.ReactNode
  success?: boolean
  error?: boolean
}

const Message = ({ className, children, success, error }: MessageProps) => {
  return (
    <div
      className={
        "message " + (success ? "success " : error ? "error " : "") + className
      }
    >
      <span>{children}</span>
    </div>
  )
}

export default Message
