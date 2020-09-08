import React, { useState } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"

const REGISTRATION_MUTATION = gql`
  mutation RegistrationMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`

interface RegistrationProps {
  displayRegistration: Function
}

const Registration = ({ displayRegistration }: RegistrationProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVerification, setPasswordVerification] = useState("")
  const [signup, { error, data }] = useMutation(REGISTRATION_MUTATION, {
    variables: {
      email: email,
      password: password,
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email && password && passwordVerification) {
      signup()
    }
  }

  const saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  return (
    <div className="registration">
      <div className="close" onClick={() => displayRegistration(false)}>
        <span>✖</span>
      </div>
      <form onSubmit={event => handleSubmit(event)}>
        <h4>Please enter your credentials</h4>
        <div>
          <label>
            <input
              type="email"
              name="user_email"
              placeholder="e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></input>
          </label>
          <label>
            <input
              type="password"
              name="user_password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></input>
          </label>
          <label>
            <input
              type="password"
              name="user_password_verification"
              placeholder="verify password"
              value={passwordVerification}
              onChange={e => setPasswordVerification(e.target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">submit</button>
      </form>
      {error && <div>ERROR: {error}</div>}
      {/* {data && <div>{data}</div>} */}
    </div>
  )
}

export default Registration
