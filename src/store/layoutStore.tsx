import React, { createContext } from "react"
import { useLocalStore, useObserver } from "mobx-react"

const initValues = {
  registrationPanel: false,
  registeredSuccesfullyMessage: false,
  loginPanel: false,
  loggedIn: false,
}

export const layoutStoreContext = createContext(initValues)

interface LayoutStoreProviderProps {
  children: React.ReactNode
}

const LayoutStoreProvider = ({ children }: LayoutStoreProviderProps) => {
  const store = useLocalStore(() => ({
    registrationPanel: false,
    registeredSuccesfullyMessage: false,
    loginPanel: false,
    loggedIn: false,
  }))
  return (
    <layoutStoreContext.Provider value={store}>
      {children}
    </layoutStoreContext.Provider>
  )
}

export default LayoutStoreProvider

export const useLayoutStore = () => {
  const store = React.useContext(layoutStoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.")
  }
  return store
}
