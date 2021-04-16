import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./footer.css";
export default function Footer() {
  const { pathname } = useLocation();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    console.log(pathname);
  }, [pathname, window.innerWidth]);
  return (
    <>
      {pathname != "/dashboard" && screenWidth < 900 ? (
        <footer className="bg-dark text-light d-flex align-items-center w-100 flex-column">
          <div className="mb-4">
            <i
              className="float-left fas fa-tooth"
              style={{
                lineHeight: "32px",
                fontSize: "24px",
                marginRight: "7px",
              }}
            ></i>
            <h3 className="float-left">Dental Clark</h3>
          </div>
          <Row>
            <Col md={3}>
              <h5>Sobre nosotros</h5>
              <p style={{ fontSize: "14px" }}>
                orem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur pellentesque consectetur vulputate. Aliquam fermentum
                mollis justo, ut eleifend turpis posuere vitae. Aenean eget
                pretium metus.
              </p>
            </Col>
            <Col md={3}>
              <h5>Links rapidos</h5>
              <div style={{ fontSize: "14px", color: "white" }}>
                <p>
                  <Link to="/">Inicio</Link>
                </p>
                <p>
                  <Link to="/treatments">Tratamientos</Link>
                </p>
                <p>
                  <Link to="/about">Sobre nosotros</Link>
                </p>
                <p>
                  <Link to="/login">Iniciar sesión</Link>
                </p>
              </div>
            </Col>
            <Col md={3}>
              <h5>Redes sociales</h5>
              <div style={{ fontSize: "18px" }}>
                <Link to="/" className="mr-4">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/">
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
            </Col>
            <Col md={3}>
              <h5>Ubicación</h5>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.6980335354397!2d-117.0352982848417!3d32.53421100363322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d949aab9fa0deb%3A0x6a1e6122e072e8a3!2sDental%20Clark!5e0!3m2!1ses-419!2smx!4v1618445757337!5m2!1ses-419!2smx"
                  width="100%"
                  height="200px"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </Col>
          </Row>
        </footer>
      ) : (
        ""
      )}
    </>
  );
}
