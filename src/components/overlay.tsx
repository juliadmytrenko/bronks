import React, { useContext } from "react"
import { useLayoutStore } from "./../store/layoutStore"

///

interface OverlayProps {
  children: React.ReactNode
}

const Overlay = ({ children }: OverlayProps) => {
  const store = useLayoutStore()
  return (
    <div className="overlay">
      <div
        className="transparent_background"
        // onClick={() => {store.registrationPanel = false; store.loginPanel = false}}
      ></div>
      <div className="children">{children}</div>
    </div>
  )
}

export default Overlay
