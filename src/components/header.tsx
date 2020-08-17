import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Div960 from "../styles/Div960"

const Header = ({ siteTitle }) => (
  <header>
    <Div960>
      <h1 style={{ margin: 0 }}>
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
    </Div960>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
