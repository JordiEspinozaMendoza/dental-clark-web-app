import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Row, Col, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";
import "./header.css";
import { useState, useEffect } from "react";
import { logout, deleteUser } from "../../actions/userActions";
export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(window.scrollY);
    });
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Container className="nav-promo">
        <h4>
          <Link to="/" id="mainTitle">
            <i className="fas fa-tooth"> </i>
            <span> Dental</span> Clark
          </Link>
        </h4>
        <div id="call-now">
          <i className="fas fa-phone-volume"></i>
          <span> Llama ahora</span>
        </div>
      </Container>
      <Navbar
        fixed={scrollPosition > 250 ? "top" : "none"}
        className="navbar navbar-expand-lg navbar-light bg-light"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Brand>
            {scrollPosition > 100 ? (
              <Link to="/" id="mainTitle">
                <h4>
                  <i className="fas fa-tooth"> </i>
                  <span style={{ color: "#4582ec", display: "inline" }}>
                    {" "}
                    Dental
                  </span>{" "}
                  Clark
                </h4>
              </Link>
            ) : (
              ""
            )}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link>
                  <i className="fas fa-home"></i> Inicio
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/treatments">
                <Nav.Link>
                  <i className="fas fa-tooth"></i> Tratamientos
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="usermenu">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/services">
                    <NavDropdown.Item>Tratamientos</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin ? (
                    <>
                      <LinkContainer to="/admin/register">
                        <NavDropdown.Item>Registrar empleado</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Empleados</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    ""
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Iniciar sesión</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
