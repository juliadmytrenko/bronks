import React, { createContext } from "react"
import { useLocalStore, useObserver } from "mobx-react"

const initValues = {
  displayPanelForRegistration: false,
  displayRegisteredSuccesfullyMessage: false,
  displayPanelForLoggingIn: false,
  isLoggedIn: false,
}

export const layoutStoreContext = createContext(initValues)

interface LayoutStoreProviderProps {
  children: React.ReactNode
}

const LayoutStoreProvider = ({ children }: LayoutStoreProviderProps) => {
  const store = useLocalStore(() => ({
    displayPanelForRegistration: false,
    displayRegisteredSuccesfullyMessage: false,
    displayPanelForLoggingIn: false,
    isLoggedIn: false,
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
