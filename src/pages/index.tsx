import React from "react"
import { Link } from "gatsby"
// adding Apollo client
import { ApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
// end

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Beers from "./../components/beers"
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    <Beers></Beers>
  </Layout>
)

export default IndexPage
