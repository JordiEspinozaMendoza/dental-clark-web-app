import React, { useState, useEffect } from "react";
import { Table, Button, InputGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader";
import Message from "../../../Message";
import { LinkContainer } from "react-router-bootstrap";
import {
  listConsults,
  consultDetails,
  consultDelete,
} from "../../../../actions/consultActions";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "moment/locale/es-mx";
import "./consults.css";
import ModalConsult from "./components/modalConsult";

import Paginate from "../../../Paginator";
export default function Consults(props) {
  console.log(props);
  moment.locale("es-mx");
  const dispatch = useDispatch();

  const [pageToSearch, setPageToSearch] = useState(1);

  const [lgShow, setLgShow] = useState(false);

  const consultList = useSelector((state) => state.consultList);
  const { loading, error, consults, pages } = consultList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [dateSearch, setDateSearch] = useState();

  const consultDetailsReducer = useSelector((state) => state.consultDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    consult: myConsult,
  } = consultDetailsReducer;

  const consultDeleteReducer = useSelector((state) => state.consultDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = consultDeleteReducer;

  const handleChange = (date) => {
    typeof date == "string"
      ? console.log("")
      : setDateSearch(date.format("YYYY-MM-DD"));
  };
  useEffect(() => {
    dateSearch == undefined
      ? dispatch(listConsults("allconsults", pageToSearch))
      : dispatch(listConsults(dateSearch, pageToSearch));
  }, [dispatch, userInfo, successDelete, pageToSearch]);

  const searchHandler = () => {
    dateSearch == undefined
      ? dispatch(listConsults("allconsults", pageToSearch))
      : dispatch(listConsults(dateSearch, 1));
  };

  const getConsultDetailsHandler = (id) => {
    dispatch(consultDetails(id));
  };

  const deleteConsultHandler = (id) => {
    window.confirm("¿Seguro que deseas eliminar esta consult?") &&
      dispatch(consultDelete(id));
  };

  return (
    <>
      <h1>Consultas</h1>
      <InputGroup>
        <InputGroup.Append>
          <Datetime
            inputProps={{ placeholder: "Buscar una consulta" }}
            value={dateSearch}
            dateFormat={"YYYY-MM-DD"}
            timeFormat={false}
            onChange={handleChange}
          />
          <InputGroup.Text
            id="datetime"
            style={{ marginTop: "0", cursor: "pointer" }}
            onClick={searchHandler}
          >
            Buscar
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : consults && consults.length > 0 ? (
        <Table striped bordered hover responsive className="table-sm mt-3">
          <thead>
            <tr>
              <th>Encargado</th>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Precio total</th>
              <th>Saldo pendiente</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {consults?.map((consult) => (
              <tr key={consult._id}>
                {userInfo.isAdmin ? (
                  <LinkContainer
                    className="editPerson"
                    to={`/admin/user/${consult.user["_id"]}/edit`}
                  >
                    <td>{consult.user["name"]}</td>
                  </LinkContainer>
                ) : (
                  <td>{consult.user["name"]}</td>
                )}
                <td
                  className="editPerson"
                  onClick={() =>
                    props.onChangePatientEditId(
                      "editPatient",
                      consult.patient["_id"]
                    )
                  }
                >
                  {consult.patient["name"]}
                </td>
                <td>{consult.date.substring(0, 10)}</td>
                <td>$ {consult.price}</td>
                {consult.price - consult.payment > 0 ? (
                  <td style={{ color: "red" }}>
                    ${consult.price - consult.payment}
                  </td>
                ) : (
                  <td style={{ color: "green" }}>PAGO COMPLETO</td>
                )}
                <td>
                  <Button
                    variant="info"
                    className="btn-sm"
                    onClick={() => {
                      getConsultDetailsHandler(consult._id);
                      setLgShow(true);
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </Button>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => {
                      props.onChangeConsultEditId("editConsult", consult._id);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>

                  <Button
                    onClick={() => deleteConsultHandler(consult._id)}
                    variant="danger"
                    className="btn-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Message variant="warning">No hay citas en esta fecha</Message>
      )}
      <ModalConsult
        consult={myConsult}
        error={errorDetails}
        loading={loadingDetails}
        lgShow={lgShow}
        hide={() => setLgShow(false)}
        onChangePatientEditId={() => props.onChangePatientEditId()}
      ></ModalConsult>
      <Paginate
        pages={pages}
        changePage={(value) => setPageToSearch(value)}
        pageToSearch={pageToSearch}
      ></Paginate>
    </>
  );
}
