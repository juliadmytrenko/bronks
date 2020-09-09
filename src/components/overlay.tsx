import React from "react"

import { Observable } from "rxjs"

const observable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

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
