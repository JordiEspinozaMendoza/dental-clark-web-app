import React, { useState, useEffect } from "react";
import { Table, Button, InputGroup, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader";
import Message from "../../../Message";

import { LinkContainer } from "react-router-bootstrap";

import {
  listPatients,
  deletePatient,
  searchPatients,
  getPatientDetails,
} from "../../../../actions/patientActions";

import ModalPatient from "./components/modalPatient";

export default function Patients(props) {
  const [lgShow, setLgShow] = useState(false);

  const dispatch = useDispatch();

  const [patientsToSearch, setPatientsToSearch] = useState("");
  const patientSearch = useSelector((state) => state.patientSearch);
  const { loading, error, patients } = patientSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientDelete = useSelector((state) => state.patientDelete);
  const { success: successDelete } = patientDelete;

  const patientDetails = useSelector((state) => state.patientDetails);
  const {
    loading: loadingPatientDetails,
    error: errorPatientDetails,
    patient,
  } = patientDetails;
  // console.log(props);
  const deletePatientHandler = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar a este paciente?"))
      dispatch(deletePatient(id));
  };
  const patientDetailsHandler = (id) => {
    dispatch(getPatientDetails(id));
  };
  useEffect(() => {
    dispatch(searchPatients(patientsToSearch));
  }, [dispatch, userInfo, successDelete, patientsToSearch]);
  return (
    <>
      <Button
        onClick={(event) => props.onChange("registerPatient")}
        variant="primary"
      >
        Registrar paciente
      </Button>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          className="mt-3"
          placeholder="Buscar un paciente"
          value={patientsToSearch}
          onChange={(e) => {
            setPatientsToSearch(e.target.value);
          }}
        ></Form.Control>
      </Form>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : patients.length == 0 ? (
        <Message variant="warning">
          No hay resultados para {patientsToSearch}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Edad</th>
                <th>Telefono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients?.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.lastName}</td>
                  <td>
                    <a href={`mailto:${patient["email"]}`}>
                      {patient["email"]}
                    </a>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <Button
                      variant="info"
                      className="btn-sm"
                      onClick={() => {
                        setLgShow(true);
                        patientDetailsHandler(patient._id);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </Button>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={(event) =>
                        props.onChangePatientEditId("editPatient", patient._id)
                      }
                    >
                      <i className="fas fa-edit"></i>
                    </Button>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deletePatientHandler(patient._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <ModalPatient
        lgShow={lgShow}
        loadingPatientDetails={loadingPatientDetails}
        errorPatientDetails={errorPatientDetails}
        patient={patient}
        hide={() => setLgShow(false)}
      ></ModalPatient>
    </>
  );
}
