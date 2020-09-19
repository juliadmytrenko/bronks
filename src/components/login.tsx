import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "./../store/layoutStore"
import Overlay from "./overlay"
import FormTemplate from "./formTemplate.tsx"
import { Form } from "react-bootstrap"

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

  const handleClose = () => {
    store.displayPanelForLoggingIn = false
  }

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
    store.isLoggedIn = true
    store.displayPanelForLoggingIn = false
  }

  return (
    <Overlay>
      <FormTemplate onSubmit={handleSubmit} onClose={handleClose}>
        <h4 color="blue">Log in</h4>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Form.Group>
      </FormTemplate>
    </Overlay>
  )
}

export default Login
