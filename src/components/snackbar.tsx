import React from "react"

interface snackbarProps {
  children: React.ReactNode
}

const Snackbar = ({ children, setRegistration }: snackbarProps) => {
  return (
    <div className="snackbar">
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
