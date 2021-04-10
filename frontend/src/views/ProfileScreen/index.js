import React, { useState, useEffect } from "react";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginator";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { getPatientDetails } from "../../actions/patientActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import { history as consultsHistory } from "../../actions/consultActions";
import ModalPatient from "../../components/Dashboard/components/patients/components/modalPatient";
// import { ModalConsult } from "../../components/Dashboard/components/consults/components/modalConsult";

export default function ProfileScreen({ history }) {
  const [lgShow, setLgShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [pageToSearch, setPageToSearch] = useState(1);
  const consultHistory = useSelector((state) => state.consultHistory);

  const {
    loading: loadingHistory,
    error: errorHistory,
    consults: myConsults,
    pages,
  } = consultHistory;

  const patientDetails = useSelector((state) => state.patientDetails);
  const {
    loading: loadingPatientDetails,
    error: errorPatientDetails,
    patient,
  } = patientDetails;

  const patientDetailsHandler = (id) => {
    dispatch(getPatientDetails(id));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo._id));
        dispatch(consultsHistory("user", userInfo._id, pageToSearch));
      } else {
        dispatch(consultsHistory("user", user._id, pageToSearch));

        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, userInfo, user, success]);
  useEffect(() => {
    dispatch(consultsHistory("user", user._id, pageToSearch));
  }, [pageToSearch, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password != passwordConfirm)
      setMessage("Ambas contraseñas deben coincidir");
    else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setMessage("");
    }
  };
  return (
    <>
      <Row className="p-5">
        <Col md={3} className="float-left">
          <h2>Mi perfil</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="passwordConfirm">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Actualizar perfil
            </Button>
          </Form>
        </Col>

        <Col md={9} className="float-left">
          <h2>Mis consultas</h2>

          {loadingHistory ? (
            <Loader />
          ) : errorHistory ? (
            <Message variant="danger">{errorHistory}</Message>
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm mt-3"
              >
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Detalles / tratamiento</th>
                    <th>Abonó</th>
                  </tr>
                </thead>
                <tbody>
                  {myConsults &&
                    !lgShow &&
                    myConsults?.map((consult) => (
                      <tr key={consult._id}>
                        <td
                          onClick={() => {
                            setLgShow(true);
                            patientDetailsHandler(consult.patient["_id"]);
                          }}
                          className="editPerson"
                        >
                          {consult.patient["name"]}
                        </td>

                        <td>{consult.date.substring(0, 10)}</td>
                        <td>{consult.details}</td>
                        <td>$ {consult.price}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Paginate
                pages={pages}
                changePage={(value) => setPageToSearch(value)}
                pageToSearch={pageToSearch}
              ></Paginate>
            </>
          )}
        </Col>
        <ModalPatient
          lgShow={lgShow}
          loadingPatientDetails={loadingPatientDetails}
          errorPatientDetails={errorPatientDetails}
          patient={patient}
          hide={() => setLgShow(false)}
        ></ModalPatient>
      </Row>
      <div class="clearfix"></div>
    </>
  );
}
