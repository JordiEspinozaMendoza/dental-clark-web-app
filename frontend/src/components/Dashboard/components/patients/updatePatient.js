import React, { useState, useEffect } from "react";

import { Button, Form } from "react-bootstrap";
import FormContainer from "../../../Form";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../Loader";
import Message from "../../../Message";

import {
  updatePatient,
  getPatientDetails,
} from "../../../../actions/patientActions";
import { PATIENT_UPDATE_RESET } from "../../../../constants/patientConstants";

export default function EditPatient(props) {
  const patientId = props.Id;
  console.log(props);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState(0);
  const [sex, setSex] = useState("Mujer");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  const patientDetails = useSelector((state) => state.patientDetails);
  const { error, loading, patient } = patientDetails;

  const patientUpdate = useSelector((state) => state.patientUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = patientUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PATIENT_UPDATE_RESET });
      props.onChange("patients");
    } else {
      if (!patient.name || patient._id !== Number(patientId)) {
        dispatch(getPatientDetails(patientId));
      } else {
        setName(patient.name);
        setLastName(patient.lastName);
        setAge(patient.age);
        setPhone(patient.phone);
        setSex(patient.sex);
        setEmail(patient.email);
      }
    }
  }, [patient, patientId, successUpdate, props]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePatient({
        _id: patientId,
        name: name,
        lastName: lastName,
        age: age,
        phone: phone,
        sex: sex,
        email: email,
      })
    );
  };
  return (
    <>
      <FormContainer>
        <Button
          variant="outline-primary"
          onClick={(event) => props.onChange("patients")}
        >
          Regresar
        </Button>
        <h1 className="mt-5">Editar paciente</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{errorUpdate}</Message>
        ) : (
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
              Editar paciente
            </Button>
          </Form>
        )}

        <div style={{ marginTop: "20px" }}></div>
        {successUpdate && (
          <Message variant="primary">Paciente editado exitosamente</Message>
        )}
        {successUpdate == false && (
          <Message variant="danger">Ha ocurrido un error</Message>
        )}
      </FormContainer>
    </>
  );
}
