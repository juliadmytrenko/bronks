import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Div960 = ({ children }) => <Wrapper>{children}</Wrapper>

export default Div960
