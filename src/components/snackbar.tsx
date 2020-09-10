import React, { useContext } from "react"
import { useLayoutStore } from "./../store/layoutStore"

interface snackbarProps {
  className?: string
  children: React.ReactNode
  success?: boolean
  error?: boolean
}

const Snackbar = ({ className, children, success, error }: snackbarProps) => {
  const store = useLayoutStore()
  return (
    <div
      className={
        "snackbar " + (success ? "success " : error ? "error " : "") + className
      }
    >
      {children}
      <button
        className="X"
        onClick={() => (store.registeredSuccesfullyMessage = false)}
      >
        ✖
      </button>
    </div>
  )
}

export default Snackbar
