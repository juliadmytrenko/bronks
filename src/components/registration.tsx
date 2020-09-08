import React, { useState } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"

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
  setRegistration: Function
}

const Registration = ({ setRegistration }: RegistrationProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVerification, setPasswordVerification] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [signup] = useMutation(REGISTRATION_MUTATION, {
    variables: {
      email: email,
      password: password,
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email && password && passwordVerification) {
      try {
        const { data } = await signup()
        confirm(data)
      } catch (error) {
        setError(true)
      }
    }
  }

  const saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  const confirm = async data => {
    const { token } = data.signup
    saveUserData(token)
    // navigate(`/`)
    setSuccess(true)
    setRegistration({ display: false, success: true })
  }

  return (
    <div className="registration">
      {/* <div
        className="close"
        onClick={registation =>
          setRegistration({ ...registation, display: false })
        }
      > */}
      <button
        className="close"
        onClick={registation =>
          setRegistration({ ...registation, display: false })
        }
      >
        ✖
      </button>
      {/* </div> */}
      <form onSubmit={event => handleSubmit(event)}>
        <h4>Please enter your credentials</h4>
        <div>
          <label>
            {error && (
              <Message error>
                User with this email already exists. Please check your email.
              </Message>
            )}
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
      {/* {data && <div>{data}</div>} */}
    </div>
  )
}

export default Registration
