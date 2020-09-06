import { Link, navigate } from "gatsby"
import React from "react"

interface HeaderProps {
  siteTitle: string
  displayRegistration: Function
}

const Header = ({ siteTitle, displayRegistration }: HeaderProps) => {
  return (
    <header>
      <div className="width960">
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
        <Register displayRegistration={displayRegistration}></Register>
      </div>
    </header>
  )
}

export default Header

interface RegisterProps {
  displayRegistration: Function
}

// stworzyc druga strone na ktorej tez jest rejestracja i ten komponent tylko ze ma /registration w url
const Register = ({ displayRegistration }: RegisterProps) => {
  return (
    <div onClick={() => displayRegistration(true)}>
      <Link to="/#" className="register">
        Register
      </Link>
    </div>
  )
}
