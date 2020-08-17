import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Div960 from "../styles/Div960"

const StyledFooter = styled.footer``

const Footer = () => (
  <StyledFooter>
    <Div960>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </Div960>
  </StyledFooter>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
