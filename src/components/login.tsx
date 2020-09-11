import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "./../store/layoutStore"
import Overlay from "./overlay"

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const store = useLayoutStore()
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: email,
      password: password,
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email && password) {
      try {
        const { data } = await login()
        confirm(data)
      } catch (error) {
        setError(true)
      }
    }
  }

  const saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  type Login = { token: string }
  interface Data {
    login: Login
  }

  const confirm = async (data: Data) => {
    const { token } = data.login
    saveUserData(token)
    // navigate(`/`)
    store.displayPanelForLoggingIn = false
  }

  return (
    <Overlay>
      <div className="panelForLoggingIn">
        <button
          className="close"
          onClick={() => (store.displayPanelForLoggingIn = false)}
        >
          ✖
        </button>
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
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </Overlay>
  )
}

export default Login
