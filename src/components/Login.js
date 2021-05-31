import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container, Jumbotron } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ImageBg from "../images/bg_EST.png"
import { Component } from "react"



export default function Login() {
  

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  var sectionStyle = {
    backgroundImage: `url(${ImageBg})`,
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (

    <Container 
    className="d-flex align-items-center justify-content-center"
    style={{minHeight: "100vh", backgroundImage: `url(${ImageBg})`, maxWidth: "100vw"}}
    >
    <div className="w-100" style={{ maxWidth: "400px"}}>
      <Container>
      <Card style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
        <Card.Body style={{ height: "400px", marginTop: "50px"}}>
          <h2 className="text-center mb-4">Se connecter</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
            SE CONNECTER
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Mot de passe oublié?</Link>
          </div>
        </Card.Body>
      </Card>

      </Container>
    </div>
    </Container>  
  )
}

/*<div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div> */