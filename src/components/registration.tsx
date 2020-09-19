import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "./../store/layoutStore"
import Overlay from "./overlay"
import { Form, Modal, Button } from "react-bootstrap"
import FormTemplate from "./formTemplate.tsx"

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

  const handleClose = () => {
    store.displayPanelForRegistration = false
  }

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
    <Modal
      show={store.displayPanelForRegistration}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormTemplate onSubmit={handleSubmit}>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <Form.Control
            type="password"
            placeholder="verify password"
            value={passwordVerification}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordVerification(e.target.value)
            }
          />

          <Form.Check
            type="checkbox"
            label="I agree to the Terms and Conditions"
          />
        </FormTemplate>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Registration
