import { Row, Col, Image, Button, Form, ButtonGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodayConsults from "./components/consults/todayConsults";
import Consults from "./components/consults/allConsults";
import RegisterConsult from "./components/consults/registerConsult";
import UpdateConsult from "./components/consults/updateConsult";

import RegisterPatient from "./components/patients/registerPatient";
import Patients from "./components/patients/patients";
import EditPatient from "./components/patients/updatePatient";
export default function Dashboard({ history }) {
  const [dashboardContent, setDashboardContent] = useState("todayConsults");
  const [patientEditId, setpatientEditId] = useState(0);

  const [consultEditId, setconsultEditId] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {}, [history, userInfo]);
  return (
    <>
      <Row style={{ height: "auto" }}>
        <Col
          md={3}
          className="p-5"
          style={{ borderRight: "1px solid #ccc", height: "90vh" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <h2 style={{ width: "100%", textAlign: "left" }}>Dashboard</h2>
            <ButtonGroup vertical className="w-100">
              <Button
                onClick={() => setDashboardContent("todayConsults")}
                variant={
                  dashboardContent == "todayConsults"
                    ? "primary"
                    : "outline-primary"
                }
                className="my-3 w-100"
              >
                <i className="fas fa-home"></i> Consultas de hoy
              </Button>
              <Button
                onClick={() => setDashboardContent("registerConsult")}
                variant={
                  dashboardContent == "registerConsult"
                    ? "primary"
                    : "outline-primary"
                }
                className="my-3 w-100"
              >
                <i className="fas fa-check"></i> Registrar consulta
              </Button>
              {/* <Button
                onClick={() => setDashboardContent("addService")}
                variant={
                  dashboardContent == "addService"
                    ? "primary"
                    : "outline-primary"
                }
                className="my-3 w-100"
              >
                <i className="fas fa-plus-square"></i> Agregar servicio
              </Button>
              <Button
                onClick={() => setDashboardContent("editService")}
                variant={
                  dashboardContent == "editService"
                    ? "primary"
                    : "outline-primary"
                }
                className="my-3 w-100"
              >
                <i className="fas fa-edit"></i> Editar servicio
              </Button> */}
              <Button
                onClick={() => setDashboardContent("consults")}
                variant={
                  dashboardContent == "consults" ||
                  dashboardContent == "editConsult"
                    ? "primary"
                    : "outline-primary"
                }
                className="my-3 w-100"
              >
                <i className="fas fa-list-alt"></i> Todas las consultas
              </Button>
              <Button
                onClick={() => setDashboardContent("patients")}
                variant={
                  dashboardContent == "patients" ||
                  dashboardContent == "editPatient"
                    ? "primary"
                    : "outline-primary"
                }
                className="my-3 w-100"
              >
                <i className="fas fa-list-alt"></i> Pacientes
              </Button>
            </ButtonGroup>
          </div>
        </Col>
        <Col md={9} className="p-5">
          <div>
            {dashboardContent == "todayConsults" && (
              <TodayConsults
                Id={consultEditId}
                onChangeConsultEditId={(value, id) => {
                  setconsultEditId(id);
                  setDashboardContent(value);
                }}
                onChangePatientEditId={(value, id) => {
                  setpatientEditId(id);
                  setDashboardContent(value);
                }}
              ></TodayConsults>
            )}
            {dashboardContent == "registerConsult" && (
              <RegisterConsult></RegisterConsult>
            )}

            {dashboardContent == "consults" && (
              <Consults
                Id={consultEditId}
                onChangeConsultEditId={(value, id) => {
                  setconsultEditId(id);
                  setDashboardContent(value);
                }}
                onChangePatientEditId={(value, id) => {
                  setpatientEditId(id);
                  setDashboardContent(value);
                }}
              ></Consults>
            )}
            {dashboardContent == "editConsult" && (
              <UpdateConsult
                Id={consultEditId}
                onChange={(value) => setDashboardContent(value)}
              ></UpdateConsult>
            )}
            {dashboardContent == "patients" && (
              <Patients
                Id={patientEditId}
                onChange={(value) => setDashboardContent(value)}
                onChangePatientEditId={(value, id) => {
                  setpatientEditId(id);
                  setDashboardContent(value);
                }}
              ></Patients>
            )}
            {dashboardContent == "registerPatient" && (
              <RegisterPatient
                onChange={(value) => setDashboardContent(value)}
              ></RegisterPatient>
            )}
            {dashboardContent == "editPatient" && (
              <EditPatient
                Id={patientEditId}
                onChange={(value) => setDashboardContent(value)}
              ></EditPatient>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}
