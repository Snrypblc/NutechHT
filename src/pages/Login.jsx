import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {loading, error} = useSelector((state) => state.user)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault()
  
    let userCredintials = {
      email, password
    }
    dispatch(loginUser(userCredintials)).then((result) => {
      if(result.payload) {
        setEmail("");
        setPassword("");
        navigate("/home")
      }
    })
  }

  return (
    <div>
      <Container>
        <Form className="w-50 mx-auto" onSubmit={handleLogin}>
          <h1 className="text-center">Nutech Indonesia</h1>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            {loading?"Loading...":"Login"}
          </Button>
          {error&&(
            <div className="alert alert danger" role="alert">{error}</div>
          )}
        </Form>
      </Container>
    </div>
  );
}

export default Login;
