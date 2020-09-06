import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

const CreateLink = () => {
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")

  const [postLink, { error, data }] = useMutation(POST_MUTATION, {
    variables: { description: description, url: url },
  })

  return (
    <div>
      <div>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
          required
        />
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
          required
        />
      </div>
      <button onClick={() => description && url && postLink()}>Submit</button>

      {error && <p>ERROR in mutation</p>}
    </div>
  )
}

export default CreateLink
