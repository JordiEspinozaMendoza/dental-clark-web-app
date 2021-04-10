import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./consults.css";

import {
  Row,
  Col,
  Image,
  Button,
  Form,
  Modal,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import FormContainer from "../../../Form";
import { searchPatients } from "../../../../actions/patientActions";
import { register } from "../../../../actions/consultActions";
import Loader from "../../../Loader";
import Message from "../../../Message";
export default function RegisterConsult({ history }) {
  //Detalles de consulta
  const [patient, setPatient] = useState(0);
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0.0);
  //Fin detalles de consulta
  const [patientSelected, setPatientSelected] = useState(
    "Selecciona un paciente"
  );
  const dispatch = useDispatch();

  const [lgShow, setLgShow] = useState(false);
  const [patientsToSearch, setPatientsToSearch] = useState("");
  const patientSearch = useSelector((state) => state.patientSearch);
  const { loading, error, patients } = patientSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register({
        user: userInfo._id,
        patient: Number(patient),
        price: price,
        details: details,
      })
    );
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(searchPatients(patientsToSearch));
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, patientsToSearch]);

  return (
    <>
      <h1>Registrar consulta</h1>
      <Form onSubmit={submitHandler}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={patientSelected}
            aria-label="Paciente"
            aria-describedby="pacientSelected"
            readOnly={true}
            style={{
              backgroundColor: "white",
              hover: { cursor: "none" },
              cursor: "default",
            }}
          />
          <InputGroup.Append>
            <InputGroup.Text
              id="pacientSelected"
              style={{ marginTop: "0", cursor: "pointer" }}
              onClick={() => setLgShow(true)}
            >
              Selecciona un paciente
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

        <Form.Group>
          <Form.Label>Detalles</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Detalles de la consulta"
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Precio</Form.Label>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text style={{ marginTop: "0" }}>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputGroup.Append>
              <InputGroup.Text style={{ marginTop: "0" }}>.00</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="primary">
          Registrar consulta
        </Button>
      </Form>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Selecciona un paciente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "85vh" }}>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{ marginTop: "0" }}>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={patientsToSearch}
                  onChange={(e) => setPatientsToSearch(e.target.value)}
                ></Form.Control>
              </InputGroup>
            </Form.Group>
          </Form>

          <ListGroup variant="flush">
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : patients.length == 0 ? (
              <Message variant="warning">
                No hay resultados para {patientsToSearch}
              </Message>
            ) : (
              patients?.map((patient) => (
                <ListGroup.Item
                  className="patientsItems"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setPatient(patient._id);
                    setLgShow(false);
                    setPatientSelected(patient.name + " " + patient.lastName);
                  }}
                >
                  ID: {patient._id}
                  <br />
                  {patient.name + " " + patient.lastName}
                  <br />
                  {patient.email}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
