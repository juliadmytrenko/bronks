import React from "react"
import Registration from "./registration"
import Login from "./login"
import { useLayoutStore } from "../store/layoutStore"
import { useObserver } from "mobx-react"

interface MainProps {
  children?: React.ReactNode
}

const Main = ({ children }: MainProps) => {
  const store = useLayoutStore()
  return useObserver(() => (
    <main>
      {store.displayPanelForRegistration && <Registration />}
      {store.displayPanelForLoggingIn && <Login />}

      <div className="children">{children}</div>
    </main>
  ))
}
export default Main
