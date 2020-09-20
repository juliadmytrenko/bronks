import React from "react"
import SignUp from "./signUp"
import Login from "./logIn"
import { useLayoutStore } from "../store/layoutStore"
import { useObserver } from "mobx-react"

interface MainProps {
  children?: React.ReactNode
}

const Main = ({ children }: MainProps) => {
  const store = useLayoutStore()
  return useObserver(() => (
    <main>
      {store.displayPanelForRegistration && <SignUp />}
      {store.displayPanelForLoggingIn && <Login />}

      <div className="children">{children}</div>
    </main>
  ))
}
export default Main
