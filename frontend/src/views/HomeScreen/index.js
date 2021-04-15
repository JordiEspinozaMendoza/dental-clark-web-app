import Banner from "../../components/Banner";
import Loader from "../../components/Loader";
import { Row, Col, Image, Button } from "react-bootstrap";
import "./homeScreen.css";
import Services from "../../components/Services/Services";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listServices } from "../../actions/serviceActions";

import UbicationMap from "../../components/UbicationMap";
export default function HomeScreen() {
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.serviceList);
  const {
    loading: loadingDetails,
    success,
    services,
    pages,
    error,
  } = serviceList;
  useEffect(() => {
    dispatch(listServices(1));
  }, []);
  return (
    <>
      {loadingDetails ? (
        <div
          style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
        >
          <Loader />
        </div>
      ) : (
        <div className="HomeScreen">
          <Banner />
          <Row style={{ width: "90%", margin: "0 auto" }}>
            <Col
              md={6}
              style={{
                height: "450px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ display: "block", width: "100%", height: "80%" }}
                src="https://clinicadentalgaudi.com/wp-content/uploads/2020/12/iStock-1202326052-2.jpg"
              />
            </Col>
            <Col
              md={6}
              className="flex presentation"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 40px",
                textAlign: "left",
              }}
            >
              <h2>Dental Clark</h2>
              <span>
                El trozo de texto estándar de Lorem Ipsum usado desde el año
                1500 es reproducido debajo para aquellos interesados. Las
                secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum"
                por Cicero son también reproducidas en su forma original exacta,
                acompañadas por versiones en Inglés de la traducción realizada
                en 1914 por H. Rackham.
              </span>
            </Col>
          </Row>
          <Row className="services">
            <Col lg={4} md={12}>
              <h4>Nuestros tratamientos</h4>
              <span>
                El trozo de texto estándar de Lorem Ipsum usado desde el año
                1500 es reproducido debajo para aquellos interesados. Las
                secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum"
                por Cicero son también reproducidas en su forma original exacta,
                acompañadas por versiones en Inglés de la traducción realizada
                en 1914 por H. Rackham.
              </span>
              <Link to="/treatments">
                <Button variant="success">Ver todos los tratamientos</Button>
              </Link>
            </Col>
            <Col lg={8} md={12} className="servicesList">
              <Row>
                {services?.map((service) => (
                  <Col lg={4} md={6} sm={12}>
                    <Services
                      url={`https://res.cloudinary.com/dental-clark/${service.image}`}
                      k
                      name={"Prueba"}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className="p-4 bg-primary text-light">
            <Col lg={8} md={6} sm={12}>
              <h2>Agenda una cita</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur pellentesque consectetur vulputate. Aliquam fermentum
                mollis justo, ut eleifend turpis posuere vitae. Aenean eget
                pretium metus. Maecenas at sagittis dolor. Curabitur dolor
                dolor, sollicitudin a sollicitudin ac, hendrerit vel lorem.
                Aenean condimentum feugiat sodales. Proin rhoncus cursus ex,
                eget suscipit lorem convallis et. Phasellus malesuada odio non
                mi pellentesque, non blandit tortor posuere. Ut at fermentum
                erat.
              </p>
            </Col>
            <Col
              lg={4}
              md={6}
              sm={12}
              className="p-3"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Button className="btn btn-secondary btn-lg btn-block ">
                Agenda una cita
              </Button>
            </Col>
          </Row>
          <div>
            <div
              className="d-flex align-items-center text-center flex-column"
              style={{ padding: "40px 60px" }}
            >
              <h2 className="w-100">Ubicación</h2>
              <p className="w-50">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur pellentesque consectetur vulputate. Aliquam fermentum
                mollis justo, ut eleifend turpis posuere vitae. Aenean eget
                pretium metus. Maecenas at sagittis dolor.
              </p>
            </div>
            <UbicationMap></UbicationMap>
          </div>
        </div>
      )}
    </>
  );
}
