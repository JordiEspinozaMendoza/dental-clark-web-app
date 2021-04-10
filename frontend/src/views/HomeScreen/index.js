import Banner from "../../components/Banner";
import { Row, Col, Image, Button } from "react-bootstrap";
import "./homeScreen.css";
import Services from "../../components/Services/Services";
export default function HomeScreen() {
  return (
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
            El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es
            reproducido debajo para aquellos interesados. Las secciones 1.10.32
            y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero son también
            reproducidas en su forma original exacta, acompañadas por versiones
            en Inglés de la traducción realizada en 1914 por H. Rackham.
          </span>
        </Col>
      </Row>
      <Row className="services">
        <Col lg={4} md={12}>
          <h4>Nuestros servicios</h4>
          <span>
            El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es
            reproducido debajo para aquellos interesados. Las secciones 1.10.32
            y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero son también
            reproducidas en su forma original exacta, acompañadas por versiones
            en Inglés de la traducción realizada en 1914 por H. Rackham.
          </span>
          <Button variant="success">Primary</Button>
        </Col>
        <Col lg={8} md={12} className="servicesList">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <Services
                url={
                  "https://gacetadental.com/wp-content/uploads/2020/02/Clinicas-solidarias.jpg"
                }
                name={"Prueba"}
              />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Services
                url={
                  "https://gacetadental.com/wp-content/uploads/2020/02/Clinicas-solidarias.jpg"
                }
                name={"Prueba"}
              />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Services
                url={
                  "https://gacetadental.com/wp-content/uploads/2020/02/Clinicas-solidarias.jpg"
                }
                name={"Prueba"}
              />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Services
                url={
                  "https://gacetadental.com/wp-content/uploads/2020/02/Clinicas-solidarias.jpg"
                }
                name={"Prueba"}
              />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Services
                url={
                  "https://gacetadental.com/wp-content/uploads/2020/02/Clinicas-solidarias.jpg"
                }
                name={"Prueba"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="p-4 bg-primary text-light">
        <Col lg={8} md={6} sm={12}>
          <h2>Agenda una cita</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pellentesque consectetur vulputate. Aliquam fermentum mollis justo,
            ut eleifend turpis posuere vitae. Aenean eget pretium metus.
            Maecenas at sagittis dolor. Curabitur dolor dolor, sollicitudin a
            sollicitudin ac, hendrerit vel lorem. Aenean condimentum feugiat
            sodales. Proin rhoncus cursus ex, eget suscipit lorem convallis et.
            Phasellus malesuada odio non mi pellentesque, non blandit tortor
            posuere. Ut at fermentum erat.
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
    </div>
  );
}
