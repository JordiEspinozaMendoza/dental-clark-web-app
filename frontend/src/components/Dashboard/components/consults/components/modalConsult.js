import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import Message from "../../../../Message";
import { consultDetails } from "../../../../../actions/consultActions";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";

export default function ModalConsult({
  consult,
  lgShow,
  loading,
  error,
  hide,
  editPatient,
}) {
  moment.locale("es-mx");
  return (
    <Modal
      size="lg"
      show={lgShow}
      onHide={() => hide()}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Detalles de la consulta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {consult ? (
              <>
                <h5>Paciente</h5>
                <p
                  className="editPerson"
                  onClick={() => editPatient(consult.patient["_id"])}
                >
                  {consult.patient["name"]}
                </p>
                <h5>Encargado</h5>
                <LinkContainer
                  className="editPerson"
                  to={`/admin/user/${consult.user["_id"]}/edit`}
                >
                  <p>{consult.user["name"]}</p>
                </LinkContainer>
                <h5>Detalles</h5>
                <p>{consult.details}</p>
                <h5>Abono</h5>
                <p>$ {consult.price}</p>
                <h5>Hora</h5>
                <p className="text-capitalize">
                  {moment(consult.date).format("h:mm A")}
                </p>
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
