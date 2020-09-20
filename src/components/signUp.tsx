import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "../store/layoutStore"
import Overlay from "./overlay"
import {
  Form,
  Modal,
  Button,
  InputGroup,
  Col,
  Container,
  Row,
} from "react-bootstrap"
import FormTemplate from "./formTemplate.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as Yup from "yup"

interface ISignUpFormInputs {
  email: string
  password: string
  passwordComfirmation: string
  termsAndConditionsConsent: boolean
}

const SIGNUP_MUTATION = gql`
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

const SignupSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  termsAndConditionsConsent: Yup.boolean().oneOf(
    [true],
    "Must Accept Terms and Conditions"
  ),
})

const SignUp = () => {
  const store = useLayoutStore()
  const [signup] = useMutation(SIGNUP_MUTATION)
  const [connectionError, setConnectionError] = useState(false)
  const { register, errors, handleSubmit } = useForm<ISignUpFormInputs>({
    resolver: yupResolver(SignupSchema),
  })

  const handleClose = () => {
    store.displayPanelForRegistration = false
  }

  const onSubmit = async (data: ISignUpFormInputs) => {
    try {
      const { userData } = await signup({
        variables: { email: data.email, password: data.password },
      })
      confirm(userData)
    } catch (error) {
      setConnectionError(true)
    }
    console.log("heyy")
    console.log(data)
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Container className="grid">
            <Row>
              <Col>
                {connectionError && <p>server connection error</p>}
                <Form.Group>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="email"
                    ref={register}
                  />
                  <p>{errors.email?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="password"
                    ref={register}
                  />
                  <p>{errors.password?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="passwordConfirmation"
                    type="password"
                    placeholder="confirm password"
                    ref={register}
                  />
                  <p>{errors.passwordConfirmation?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    name="termsAndConditionsConsent"
                    type="checkbox"
                    label="I agree to the Terms and Conditions"
                    ref={register}
                  />
                  <p>{errors.termsAndConditionsConsent?.message}</p>
                </Form.Group>
              </Col>
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

export default SignUp
