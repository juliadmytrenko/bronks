import { Link } from "gatsby"
import React from "react"

interface HeaderProps {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => (
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
      <a href="#" className="register">
        Register
      </a>
    </div>
  </header>
)

export default Header
