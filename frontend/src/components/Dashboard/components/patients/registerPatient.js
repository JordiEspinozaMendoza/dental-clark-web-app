import React, { useState, useEffect } from "react";

import { Row, Col, Image, Button, Form } from "react-bootstrap";
import FormContainer from "../../../Form";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../Loader";
import Message from "../../../Message";

import { register } from "../../../../actions/patientActions";
import { PATIENT_REGISTER_RESET } from "../../../../constants/patientConstants";

export default function RegisterPatient(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState(0);
  const [sex, setSex] = useState("Mujer");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const patientRegister = useSelector((state) => state.patientRegister);
  const { success } = patientRegister;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, sex, lastName, age, phone, email));
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: PATIENT_REGISTER_RESET });
      props.onChange("patients");
    }
  }, [success]);
  return (
    <>
      <FormContainer>
        <Button
          variant="outline-primary"
          onClick={(event) => props.onChange("patients")}
        >
          Regresar
        </Button>
        <h1 className="mt-5">Registrar paciente</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa sus apellidos"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa su telefono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="sex">
            <Form.Label>Sexo</Form.Label>
            <Form.Check
              checked={sex != "Hombre"}
              type="radio"
              id="default-radio"
              label="Mujer"
              onChange={(e) => setSex("Mujer")}
            ></Form.Check>
            <Form.Check
              checked={sex != "Mujer"}
              type="radio"
              id="default-radio2"
              label="Hombre"
              onChange={(e) => setSex("Hombre")}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa su edad"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Registrar paciente
          </Button>
        </Form>
        <div style={{ marginTop: "20px" }}></div>
        {success && (
          <Message variant="primary">Paciente creado exitosamente</Message>
        )}
        {success == false && (
          <Message variant="danger">Ha ocurrido un error</Message>
        )}
      </FormContainer>
    </>
  );
}
