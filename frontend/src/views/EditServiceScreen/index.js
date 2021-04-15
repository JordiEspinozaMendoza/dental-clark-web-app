import { Row, Col, Image, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FormContainer from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import axios from "axios";

import { getServiceDetails, updateService } from "../../actions/serviceActions";
import {
  SERVICE_UPDATE_RESET,
  SERVICE_DETAILS_RESET,
} from "../../constants/serviceConstants";

export default function EditServiceScreen({ match, history }) {
  const serviceId = match.params.id;
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const dispatch = useDispatch();
  const serviceDetails = useSelector((state) => state.serviceDetails);
  const {
    error: errorDetails,
    loading: loadingDetails,
    service,
  } = serviceDetails;

  const serviceUpdate = useSelector((state) => state.serviceUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = serviceUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SERVICE_UPDATE_RESET });
      dispatch({ type: SERVICE_DETAILS_RESET });
      history.push("/services");
    } else {
      if (!service?.name || service._id !== Number(serviceId))
        dispatch(getServiceDetails(serviceId));
      else {
        setName(service.name);
        setDetails(service.details);
        setPrice(service.price);
        setImage(service.image);
      }
    }
  }, [service, serviceId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateService({
        _id: serviceId,
        name: name,
        details: details,
        price: price,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("service_id", serviceId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/services/upload/",
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <Link to="/services">Regresar</Link>
      <h1>Editar tratamiento</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger">{errorDetails}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="details">
            <Form.Label>Detalles</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Detalles del servicio"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa el precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Imagen</Form.Label>
            {service?.image && (
              <Image
                className="d-block my-4"
                style={{maxWidth: "330px"}}
                xs={6}
                md={4}
                src={`https://res.cloudinary.com/dental-clark/${service.image}`}
              />
            )}
            <Form.Control
              type="text"
              placeholder="Ingresa la imagen"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              readOnly={true}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Elegir un archivo"
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Button type="submit" variant="primary">
            Actualizar servicio
          </Button>
        </Form>
      )}
    </FormContainer>
  );
}
