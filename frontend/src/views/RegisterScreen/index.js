import { Row, Col, Image, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import FormContainer from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { register } from "../../actions/userActions";

export default function RegisterScreen({ history }) {
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const submitHandler = (e) => {
    e.preventDefault();
    if (password != passwordConfirm)
      setMessage("Ambas contraseñas deben coincidir");
    else {
      dispatch(register(name, email, password));
      history.push("/admin/userlist");
    }
  };
  useEffect(() => {
    if (!userInfo) history.push("/");
    else if (!userInfo.isAdmin) history.push("/");
  }, [history, userInfo]);
  return (
    <FormContainer>
      <h1>Registrar empleado</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma su contraseña"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Registrar empleado
        </Button>
      </Form>
    </FormContainer>
  );
}
