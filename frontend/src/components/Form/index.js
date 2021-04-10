import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function FormContainer({ children }) {
  return (
    <Container className="py-5">
      <main>
        <Row className="justify-content-md-center" style={{ width: "100%" }}>
          <Col xs={12} md={6}>
            {children}
          </Col>
        </Row>
      </main>
    </Container>
  );
}
