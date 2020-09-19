/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { createContext, useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
import "./../styles/styles.scss"
import "./../styles/theme.scss"
import { useObserver } from "mobx-react"
import Header from "./header"
import Footer from "./footer"
import { useState } from "react"
import Overlay from "./overlay"
import Message from "./message"
import Snackbar from "./snackbar"
import LayoutStoreProvider, { useLayoutStore } from "./../store/layoutStore"
import Main from "./main"
// import { useObserver } from 'mobx-react-lite';
import { Button } from "react-bootstrap"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const store = useLayoutStore()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return useObserver(() => {
    return (
      <LayoutStoreProvider>
        <div className="layout">
          <div className="background">
            <Header siteTitle={data.site.siteMetadata.title}>
              {store.displayRegisteredSuccesfullyMessage && (
                <Snackbar variant="success">
                  Please check your email and click the verification link.
                </Snackbar>
              )}
            </Header>
            <Main>{children}</Main>
          </div>
          <Footer />
        </div>
      </LayoutStoreProvider>
    )
  })
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
