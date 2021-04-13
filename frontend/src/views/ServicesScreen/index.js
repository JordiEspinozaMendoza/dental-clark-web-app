import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import {
  createService,
  listServices,
  deleteService,
} from "../../actions/serviceActions";
import {
  SERVICE_REGISTER_RESET,
  SERVICE_UPDATE_RESET,
} from "../../constants/serviceConstants";
export default function ServicesScreen({ history }) {
  const [actualPage, setActualPage] = useState(1);
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, success, services, pages, error } = serviceList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const serviceRegister = useSelector((state) => state.serviceRegister);
  const {
    loading: loadingCreate,
    service: serviceCreated,
    error: errorCreate,
    success: successCreate,
  } = serviceRegister;

  const serviceDelete = useSelector((state) => state.serviceDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = serviceDelete;

  const createServiceHandler = () => {
    dispatch(createService());
  };

  const deleteServiceHandler = (id) => {
    window.confirm("¿Seguro que deseas eliminar este servicio?") &&
      dispatch(deleteService(id));
  };
  useEffect(() => {
    dispatch({ type: SERVICE_REGISTER_RESET });

    !userInfo && history.push("/");
    successCreate
      ? history.push(`/services/${serviceCreated._id}/edit`)
      : dispatch(listServices(actualPage));
  }, [dispatch, userInfo, actualPage, successCreate, successDelete]);

  return (
    <div className="p-5" style={{ minHeight: "100vh" }}>
      <Button variant="primary" onClick={() => createServiceHandler()}>
        Registrar servicio
      </Button>
      <h2 className="mt-3">Tratamientos</h2>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : services?.length == 0 ? (
        <Message variant="warning">No hay tratamientos actualmente</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service) => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.details}</td>
                <td>{service.price}</td>
                <td>
                  <LinkContainer to={`/services/${service._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteServiceHandler(service._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
