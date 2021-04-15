import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./footer.css";
export default function Footer() {
  return (
    <footer className="bg-dark text-light d-flex align-items-center w-100 flex-column">
      <div className="mb-4">
        <h3>Dental Clark</h3>
      </div>
      <Row>
        <Col md={4}>
          <h5>Sobre nosotros</h5>
          <p style={{ fontSize: "14px" }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pellentesque consectetur vulputate. Aliquam fermentum mollis justo,
            ut eleifend turpis posuere vitae. Aenean eget pretium metus.
          </p>
        </Col>
        <Col md={4}>
          <h5>Links rapidos</h5>
          <div style={{ fontSize: "14px", color:"white"}}>
            <p>
              <Link to="/">Inicio</Link>
            </p>
            <p>
              <Link to="/services">Servicios</Link>
            </p>
            <p>
              <Link to="/about">Sobre nosotros</Link>
            </p>
          </div>
        </Col>
        <Col md={4}>
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
      </Row>
    </footer>
  );
}
