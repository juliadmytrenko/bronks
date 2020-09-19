import React, { useState, useContext, ReactNode } from "react"
import { AUTH_TOKEN } from "./../constants.js"
import { gql, useMutation } from "@apollo/client"
import { navigate } from "@reach/router"
import Message from "./message"
import { useLayoutStore } from "./../store/layoutStore"
import Overlay from "./overlay"
import { Button, Container, Row, Col, Form } from "react-bootstrap"

interface FormTemplateProps {
  onSubmit: Function
  onClose: Function
  children: JSX.Element[]
}

// eatch children of jsx passed to this component is a row
const FormTemplate = ({ onSubmit, onClose, children }: FormTemplateProps) => {
  return (
    <div className="panel">
      <Button
        type="text"
        color="red"
        className="closePanel"
        onClick={onClose}
        variant="danger"
      >
        ✖ Close
      </Button>

      <Form onSubmit={onSubmit}>
        <Container className="grid">
          <Col>
            {children && children.map((child, i) => <Row key={i}>{child}</Row>)}
            <Row>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Col>
        </Container>
      </Form>
    </div>
  )
}

export default FormTemplate
