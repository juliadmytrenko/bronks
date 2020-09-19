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
  children: JSX.Element[]
}

// eatch children of jsx passed to this component is a row
const FormTemplate = ({ onSubmit, children }: FormTemplateProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Container className="grid">
        <Row>
          <Col>
            {children &&
              children.map((child, i) => (
                <Form.Group key={i}>{child}</Form.Group>
              ))}
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default FormTemplate
