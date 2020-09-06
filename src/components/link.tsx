import React from "react"

interface LinkProps {
  key: string
  link: Link
}

type Link = {
  id: string
  description: string
  url: string
}

const Link = ({ link }: LinkProps) => {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  )
}

export default Link
