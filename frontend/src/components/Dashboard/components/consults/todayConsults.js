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
import "react-datetime/css/react-datetime.css";
import "./consults.css";
import moment from "moment";

import ModalConsult from "./components/modalConsult";
import Paginate from "../../../Paginator";

export default function TodayConsults(props) {
  const dispatch = useDispatch();

  const [pageToSearch, setPageToSearch] = useState(1);

  const [lgShow, setLgShow] = useState(false);

  const consultList = useSelector((state) => state.consultList);
  const { loading, error, consults, pages } = consultList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  var todayDate = new moment().format("YYYY-MM-DD");
  const [dateSearch, setDateSearch] = useState(todayDate);

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

  useEffect(() => {
    dispatch(listConsults(dateSearch, pageToSearch));
  }, [dispatch, userInfo, successDelete, pageToSearch]);

  const getConsultDetails = (id) => {
    dispatch(consultDetails(id));
  };

  const deleteConsultHandler = (id) => {
    window.confirm("¿Seguro que deseas eliminar a este paciente?") &&
      dispatch(consultDelete(id));
  };

  return (
    <>
      <h1>Consultas de hoy</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm mt-3">
          <thead>
            <tr>
              <th>Encargado</th>
              <th>Paciente</th>

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
                      getConsultDetails(consult._id);
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
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteConsultHandler(consult._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ModalConsult
        consult={myConsult}
        error={errorDetails}
        loading={loadingDetails}
        lgShow={lgShow}
        hide={() => setLgShow(false)}
        editPatient={(id) => props.onChangePatientEditId("editPatient", id)}
      ></ModalConsult>
      <Paginate
        pages={pages}
        changePage={(value) => setPageToSearch(value)}
        pageToSearch={pageToSearch}
      ></Paginate>
    </>
  );
}
