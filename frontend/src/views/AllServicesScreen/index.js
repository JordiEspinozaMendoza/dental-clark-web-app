import { listServices } from "../../actions/serviceActions";
import { Row, Col, Image, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginator";

export default function AllConsults() {
  const [actualPage, setActualPage] = useState(1);
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, success, services, pages, error } = serviceList;
  useEffect(() => {
    dispatch(listServices(actualPage));
  }, [actualPage, dispatch]);
  return (
    <>
      {loading ? (
        <div
          style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
        >
          <Loader />
        </div>
      ) : (
        <div className="p-5">
          <div className="mb-5">
            <h2 className="w-100 text-center">Tratamientos</h2>
            <p className="w-100 text-center">
              El trozo de texto estándar de Lorem Ipsum usado desde el año 1500
              es reproducido debajo para aquellos interesados. Las secciones
              1.10.32
            </p>
          </div>
          <Row>
            {services?.map((service) => (
              <Col md={4}>
                <Image
                  style={{ display: "block", height: "350px", width: "100%" }}
                  src={`https://res.cloudinary.com/dental-clark/${service.image}`}
                />
                <h3 className="p-4 w-100 text-center">{service.name}</h3>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            changePage={(value) => setActualPage(value)}
            pageToSearch={actualPage}
          ></Paginate>
        </div>
      )}
    </>
  );
}
