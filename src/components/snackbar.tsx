import React from "react"

interface snackbarProps {
  className?: string
  children: React.ReactNode
  success?: boolean
  error?: boolean
  setRegistration: Function
}

const Snackbar = ({
  className,
  children,
  success,
  error,
  setRegistration,
}: snackbarProps) => {
  return (
    <div
      className={
        "snackbar " + (success ? "success " : error ? "error " : "") + className
      }
    >
      {children}
      <button
        className="X"
        onClick={registration =>
          setRegistration({ ...registration, success: false })
        }
      >
        ✖
      </button>
    </div>
  )
}

export default Snackbar
