import React from "react"

interface OverlayProps {
  children: React.ReactNode
  setRegistration: Function
}

const Overlay = ({ children, setRegistration }: OverlayProps) => {
  return (
    <div className="overlay">
      <div
        className="transparent_background"
        onClick={registation =>
          setRegistration({ ...registation, display: false })
        }
      ></div>
      <div className="children">{children}</div>
    </div>
  )
}

export default Overlay
