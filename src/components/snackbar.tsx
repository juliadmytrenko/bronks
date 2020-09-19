import React, { useContext } from "react"
import { useLayoutStore } from "./../store/layoutStore"
import { Alert } from "react-bootstrap"

type variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"

interface snackbarProps {
  className?: string
  children: React.ReactNode
  variant?: variant
}

const Snackbar = ({ className, children, variant }: snackbarProps) => {
  const store = useLayoutStore()
  return (
    <div className={"snackbar " + className}>
      <Alert
        className="snackbar"
        variant={variant}
        onClose={() => (store.displayRegisteredSuccesfullyMessage = false)}
        dismissible
      >
        {children}
      </Alert>
    </div>
  )
}

export default Snackbar
