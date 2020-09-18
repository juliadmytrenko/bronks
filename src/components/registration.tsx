import React, { useState, useContext } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "./../store/layoutStore"
import Overlay from "./overlay"
import {
  Button,
  Checkbox,
  Form,
  Input,
  Field,
  Label,
  Segment,
  Grid,
} from "semantic-ui-react"

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
      <div className="panel panelForRegistration">
        <Button
          type="text"
          color="red"
          className="closePanel"
          onClick={() => (store.displayPanelForRegistration = false)}
        >
          <span>✖</span> Close
        </Button>
        <Segment>
          <Form>
            <Grid classname="grid">
              <Grid.Column>
                <Grid.Row>
                  <Form.Input
                    type="email"
                    placeholder="Email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    fluid
                  />
                </Grid.Row>
                <Grid.Row>
                  <Form.Input
                    type="password"
                    placeholder="Password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    icon="lock"
                    iconPosition="right"
                    fluid
                  />
                </Grid.Row>
                <Grid.Row>
                  <Form.Input
                    type="password"
                    placeholder="Verify password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPasswordVerification(e.target.value)
                    }
                    icon="lock"
                    iconPosition="right"
                    fluid
                  />
                </Grid.Row>
                <Grid.Row>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Grid.Row>
                <Grid.Row>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Form>
        </Segment>
      </div>
    </Overlay>
  )
}

export default Registration
