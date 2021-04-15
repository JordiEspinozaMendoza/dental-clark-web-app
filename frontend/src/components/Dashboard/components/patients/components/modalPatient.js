import { useEffect, useState } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import Message from "../../../../Message";
import {
  listConsults,
  consultDetails,
  consultDelete,
  history,
} from "../../../../../actions/consultActions";
import { LinkContainer } from "react-router-bootstrap";
import { CONSULT_HISTORY_RESET } from "../../../../../constants/consultConstants";
import Paginate from "../../../../Paginator";

export default function ModalPatient({
  patient,
  lgShow,
  loadingPatientDetails,
  errorPatientDetails,
  hide,
  editConsultDashboard,
}) {
  console.log(editConsultDashboard);
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const consultHistory = useSelector((state) => state.consultHistory);
  const [pageToSearch, setPageToSearch] = useState(1);
  const {
    loading: loadingHistory,
    error: errorHistory,
    consults,
    pages,
  } = consultHistory;

  const consultDeleteReducer = useSelector((state) => state.consultDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = consultDeleteReducer;

  const historyHandler = () => {
    dispatch(history("patient", patient._id, 1));
    setShowHistory(!showHistory);
  };
  const deleteConsultHandler = (id) => {
    window.confirm("¿Seguro que deseas eliminar esta consulta?") &&
      dispatch(consultDelete(id));
  };
  useEffect(() => {
    dispatch(history("patient", patient._id, pageToSearch));
  }, [pageToSearch, dispatch, successDelete]);
  return (
    <Modal
      size="lg"
      show={lgShow}
      onHide={() => {
        hide();
        setShowHistory(false);
        setPageToSearch(1);
      }}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Detalles del paciente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loadingPatientDetails ? (
          <Loader />
        ) : errorPatientDetails ? (
          <Message variant="danger">{errorPatientDetails}</Message>
        ) : (
          <>
            {patient ? (
              <>
                <h5>Nombre</h5>
                <p>{patient["name"]}</p>
                <h5>Apellidos</h5>
                <p>{patient["lastName"]}</p>
                <h5>Edad</h5>
                <p>{patient["age"]}</p>
                <h5>Correo</h5>
                <p>
                  <a href={`mailto:${patient["email"]}`}>{patient["email"]}</a>
                </p>
                <h5>Teléfono</h5>
                <p>{patient["phone"]}</p>
                <Button variant="primary" onClick={() => historyHandler()}>
                  {showHistory == true
                    ? "Ocultar historial"
                    : "Mostrar historial"}
                </Button>
                {showHistory &&
                  (loadingHistory ? (
                    <Loader />
                  ) : errorHistory ? (
                    <Message variant="danger">{errorHistory}</Message>
                  ) : consults.length == 0 ? (
                    <Message variant="info">
                      Este usuario no tiene consultas
                    </Message>
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
                            <th>Encargado</th>
                            <th>Fecha</th>
                            <th>Detalles / tratamiento</th>
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
                              <td>{consult.date.substring(0, 10)}</td>
                              <td>{consult.details}</td>
                              <td>$ {consult.price}</td>
                              {consult.price - consult.payment > 0 ? (
                                <td style={{ color: "red" }}>
                                  ${consult.price - consult.payment}
                                </td>
                              ) : (
                                <td style={{ color: "green" }}>
                                  PAGO COMPLETO
                                </td>
                              )}
                              <td>
                                <Button
                                  variant="light"
                                  className="btn-sm"
                                  onClick={() => {
                                    editConsultDashboard(consult._id);
                                  }}
                                >
                                  <i className="fas fa-edit"></i>
                                </Button>

                                <Button
                                  onClick={() =>
                                    deleteConsultHandler(consult._id)
                                  }
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
                      <Paginate
                        pages={pages}
                        changePage={(value) => setPageToSearch(value)}
                        pageToSearch={pageToSearch}
                      ></Paginate>
                    </>
                  ))}
              </>
            ) : (
              ""
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
