/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
import "./../styles/styles.scss"
import Header from "./header"
import Footer from "./footer"
import Registration from "./registration"
import { useState } from "react"
import Overlay from "./overlay"
import Message from "./message"
import Snackbar from "./snackbar"

// experiments with RxJS

import { Observable } from "rxjs"

// end

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [registration, setRegistration] = useState({
    display: false,
    success: false,
  })

  const [displayLoginPanel, setDisplayLoginPanel] = useState(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const observer = {
    next: x => {
      console.log("Observer got a next value: " + x)
      setRegistration({ success: false, display: false })
    },
    error: err => console.error("Observer got an error: " + err),
    complete: () => console.log("Observer got a complete notification"),
  }

  return (
    <div className="layout">
      <Header
        siteTitle={data.site.siteMetadata.title}
        setRegistration={setRegistration}
      >
        {registration.success && (
          <Snackbar success setRegistration={setRegistration}>
            <span>
              Please check your email and click the verification link.
            </span>
          </Snackbar>
        )}
      </Header>
      <main>
        {registration.display && (
          <Overlay setRegistration={setRegistration}>
            <Registration setRegistration={setRegistration}></Registration>
          </Overlay>
        )}
        {/* {displayLoginPanel && (
          <Overlay setDisplayLoginPanel={setDisplayLoginPanel}>
            <LoginPanel setDisplayLoginPanel={setDisplayLoginPanel}></LoginPanel>
          </Overlay>
        )} */}
        <div className="width960 smallerPadding main__content">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
