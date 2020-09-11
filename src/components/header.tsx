import { Link, navigate } from "gatsby"
import React, { useContext } from "react"
import { useLayoutStore } from "./../store/layoutStore"

interface HeaderProps {
  children: React.ReactNode
  siteTitle: string
}

const Header = ({ children, siteTitle }: HeaderProps) => {
  return (
    <header>
      <div className="children">
        {children}
        <div className="flex">
          <h1>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
          <Register></Register>
          <Login></Login>
        </div>
      </div>
    </header>
  )
}

export default Header

// stworzyc druga strone na ktorej tez jest rejestracja i ten komponent tylko ze ma /registration w url
const Register = () => {
  const store = useLayoutStore()
  return (
    <div
      className="register"
      onClick={() => (store.displayPanelForRegistration = true)}
    >
      <Link to="#">Register</Link>
    </div>
  )
}

const Login = () => {
  const store = useLayoutStore()
  return (
    <div
      className="login"
      onClick={() => (store.displayPanelForLoggingIn = true)}
    >
      <Link to="/#">Login</Link>
    </div>
  )
}
