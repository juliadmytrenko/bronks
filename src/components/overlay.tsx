import React from "react"

interface OverlayProps {
  children: React.ReactNode
  displayRegistration: Function
}

const Overlay = ({ children, displayRegistration }: OverlayProps) => {
  return (
    <div className="overlay">
      <div
        className="transparent_background"
        onClick={() => displayRegistration(false)}
      ></div>
      <div className="children">{children}</div>
    </div>
  )
}

export default Overlay
