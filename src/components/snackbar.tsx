import React from "react"

interface snackbarProps {
  children: React.ReactNode
}

const Snackbar = ({ children }: snackbarProps) => {
  return <div className="snackbar">{children}</div>
}

export default Snackbar
