import React, { useState, useContext, ReactNode } from "react"
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

interface FormTemplateProps {
  onSubmit: Function
  onClose: Function
  children: JSX.Element[]
}

// eatch children of jsx passed to this component is a row
const FormTemplate = ({ onSubmit, onClose, children }: FormTemplateProps) => {
  return (
    <div className="panel">
      <Button type="text" color="red" className="closePanel" onClick={onClose}>
        <span>✖</span> Close
      </Button>
      <Segment>
        <Form onSubmit={onSubmit}>
          <Grid classname="grid">
            <Grid.Column>
              {children && children.map(child => <Grid.Row>{child}</Grid.Row>)}
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
  )
}

export default FormTemplate
