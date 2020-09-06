import React, { Component } from "react"
import Link from "./Link"
import { gql, useQuery } from "@apollo/client"

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY)
  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  if (error)
    return (
      <div>
        <p>ERROR</p>
      </div>
    )

  const linksToRender = data.feed.links

  return (
    <div>
      {linksToRender.map((link: Link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  )
}

export default LinkList
