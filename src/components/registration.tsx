import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "./../store/layoutStore"
import Overlay from "./overlay"
import { Button, Checkbox, Form } from "semantic-ui-react"

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

const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVerification, setPasswordVerification] = useState("")
  const [error, setError] = useState(false)
  const store = useLayoutStore()
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
  type Signup = { token: string }
  interface Data {
    signup: Signup
  }

  const confirm = async (data: Data) => {
    const { token } = data.signup
    saveUserData(token)
    // navigate(`/`)
    store.displayPanelForRegistration = false
    store.displayRegisteredSuccesfullyMessage = true
  }

  return (
    <Overlay>
      {/* <div className="panelForRegistration">
        <button
          className="closePanel"
          onClick={() => (store.displayPanelForRegistration = false)}
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
      </div> */}
      <div className="panelForRegistration">
        <Form>
          <Form.Field>
            <label>Email</label>
            <input type="email" placeholder="Email" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Password"
            />
          </Form.Field>
          <Form.Field>
            <label>Verify password</label>
            <Form.Input
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Verify password"
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </Overlay>
  )
}

export default Registration
