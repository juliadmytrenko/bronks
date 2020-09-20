import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "../store/layoutStore"
// import Overlay from "./overlay"
import {
  Form,
  Modal,
  Button,
  InputGroup,
  Col,
  Container,
  Row,
  Tooltip,
  Overlay,
  OverlayTrigger,
} from "react-bootstrap"
import FormTemplate from "./formTemplate.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as Yup from "yup"
import Snackbar from "./snackbar.tsx"

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
  email: Yup.string()
    .email("Invalid email address.")
    .required("No email provided."),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match."
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
  const {
    register,
    errors,
    handleSubmit,
    formState: { touched },
    clearErrors,
  } = useForm<ISignUpFormInputs>({
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
      {/* {connectionError && (
        <Snackbar variant="danger">
          [server connection error] <br /> Please try again later.
        </Snackbar>
      )} */}
      {/* zrobic w MobX i dodawac snackbary ktore beda wyswietlnae  */}
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
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
            <Row>
              <Form.Group as={Col}>
                <Form.Control
                  name="passwordConfirmation"
                  type="password"
                  placeholder="confirm password"
                  ref={register}
                  onChange={() => clearErrors(["passwordConfirmation"])}
                  isInvalid={!!errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Check
                  name="termsAndConditionsConsent"
                  type="checkbox"
                  label="I agree to the Terms and Conditions"
                  ref={register}
                  onChange={() => clearErrors(["termsAndConditionsConsent"])}
                  isInvalid={!!errors.termsAndConditionsConsent}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.termsAndConditionsConsent?.message}
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

export default SignUp
