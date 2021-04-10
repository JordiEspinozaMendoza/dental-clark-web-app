import { useEffect, useState } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import Message from "../../../../Message";
import { history } from "../../../../../actions/consultActions";
import { LinkContainer } from "react-router-bootstrap";
import { CONSULT_HISTORY_RESET } from "../../../../../constants/consultConstants";
import Paginate from "../../../../Paginator";

export default function ModalPatient({
  patient,
  lgShow,
  loadingPatientDetails,
  errorPatientDetails,
  hide,
}) {
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

  const historyHandler = () => {
    dispatch(history("patient", patient._id, 1));
    setShowHistory(!showHistory);
  };
  useEffect(() => {
    dispatch(history("patient", patient._id, pageToSearch));
  }, [pageToSearch, dispatch]);
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
                            <th>Abonó</th>
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
