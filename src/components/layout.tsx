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
import { useObserver } from "mobx-react"
import Header from "./header"
import Footer from "./footer"
import Registration from "./registration"
import Login from "./login"
import { useState } from "react"
import Overlay from "./overlay"
import Message from "./message"
import Snackbar from "./snackbar"
import LayoutStoreProvider, { useLayoutStore } from "./../store/layoutStore"
// import { useObserver } from 'mobx-react-lite';

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
      <div className="layout">
        <Header siteTitle={data.site.siteMetadata.title}>
          {store.registeredSuccesfullyMessage && (
            <Snackbar success>
              <span>
                Please check your email and click the verification link.
              </span>
            </Snackbar>
          )}
        </Header>
        <main>
          {store.registrationPanel && <Registration />}
          {store.loginPanel && <Login />}

          <div className="width960 smallerPadding main__content">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    )
  })
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
