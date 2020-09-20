import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "../constants.js"
import { gql, useMutation } from "@apollo/client"
import { useLayoutStore } from "../store/layoutStore"
import { Form, Modal, Button, Col, Container, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as Yup from "yup"

// TypeScript types and interfaces are usually on top of the component
type Login = { token: string }
interface Data {
  login: Login
}

interface ILogInFormInputs {
  email: string
  password: string
}

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

const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("No email provided."),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
})

const Login = () => {
  const [connectionError, setConnectionError] = useState(false)
  const {
    register,
    errors,
    handleSubmit,
    formState: { touched },
    clearErrors,
  } = useForm<ILogInFormInputs>({
    resolver: yupResolver(LogInSchema),
  })
  const store = useLayoutStore()
  const [login] = useMutation(LOGIN_MUTATION)

  const handleClose = () => {
    store.displayPanelForLoggingIn = false
  }

  const onSubmit = async (data: ILogInFormInputs) => {
    try {
      const { userData }: Record<string, any> = await login({
        variables: { email: data.email, password: data.password },
      })
      confirm(userData)
    } catch (error) {
      setConnectionError(true)
    }
    console.log(data)
  }

  const saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  const confirm = async (data: Data) => {
    const { token } = data.login
    saveUserData(token)
    store.isLoggedIn = true
    store.displayPanelForLoggingIn = false
  }

  return (
    <Modal
      show={store.displayPanelForLoggingIn}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Body>
          <Container className="grid">
            <Row>
              <Form.Group as={Col}>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="email"
                  ref={register}
                  onChange={() => clearErrors(["email"])}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="password"
                  ref={register}
                  onChange={() => clearErrors(["password"])}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default Login
