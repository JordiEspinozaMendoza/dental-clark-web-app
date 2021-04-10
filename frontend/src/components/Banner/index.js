import "./banner.css";
import { Button, Card } from "react-bootstrap";
export default function Banner() {
  return (
    <>
      <div className="banner">
        <h1>Dental Clark</h1>
        <p>Tu sonrisa es nuestro compromiso</p>
        <div className="banner-buttons">
          <Button variant="primary">Primary</Button>
          <Button variant="success">Primary</Button>
        </div>
      </div>

      <div id="main-cards">
        <Card bg="success" style={{}} className="mb-2 text-white">
          <Card.Body>
            <Card.Title className="text-white"> Ubicación </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="secondary">Primary</Button>
          </Card.Body>
        </Card>

        <Card bg="primary" className="mb-2 text-white">
          <Card.Body>
            <Card.Title className="text-white"> Redes sociales </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="secondary">Primary</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
