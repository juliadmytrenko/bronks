import { Link, navigate } from "gatsby"
import React from "react"

interface HeaderProps {
  siteTitle: string
  setRegistration: Function
}

const Header = ({ children, siteTitle, setRegistration }: HeaderProps) => {
  return (
    <header>
      <div className="width960">
        {children}
        <div className="flex">
          <h1 style={{ margin: 0, display: "inline" }}>
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
          <Register setRegistration={setRegistration}></Register>
          <Login></Login>
        </div>
      </div>
    </header>
  )
}

export default Header

interface RegisterProps {
  setRegistration: Function
}

// stworzyc druga strone na ktorej tez jest rejestracja i ten komponent tylko ze ma /registration w url
const Register = ({ setRegistration }: RegisterProps) => {
  return (
    <div
      className="register"
      onClick={registration =>
        setRegistration({ ...registration, display: true })
      }
    >
      <Link to="#">Register</Link>
    </div>
  )
}

const Login = () => {
  return (
    <div className="login">
      <Link to="/#">Login</Link>
    </div>
  )
}
