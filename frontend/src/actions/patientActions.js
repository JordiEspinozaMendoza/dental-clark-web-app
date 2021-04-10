import axios from "axios";

import {
  PATIENT_DELETE_FAIL,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_RESET,
  PATIENT_DELETE_SUCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_RESET,
  PATIENT_DETAILS_SUCESS,
  PATIENT_LIST_FAIL,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_RESET,
  PATIENT_LIST_SUCESS,
  PATIENT_REGISTER_FAIL,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_RESET,
  PATIENT_UPDATE_SUCESS,
  PATIENT_REGISTER_RESET,
  PATIENT_SEARCH_FAIL,
  PATIENT_SEARCH_REQUEST,
  PATIENT_SEARCH_RESET,
  PATIENT_SEARCH_SUCESS,
} from "../constants/patientConstants";
export const register = (name, sex, lastName, age, phone, email) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PATIENT_REGISTER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/patients/create/",
      {
        name: name,
        email: email,
        sex: sex,
        lastName: lastName,
        age: age,
        phone: phone,
      },
      config
    );
    dispatch({ type: PATIENT_REGISTER_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// list action
export const listPatients = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/patients/", config);
    dispatch({ type: PATIENT_LIST_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// Search action
export const searchPatients = (query) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_SEARCH_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    if (query == "") {
      query = "allpatients";
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/patients/search/${query}/`, config);
    dispatch({ type: PATIENT_SEARCH_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Delete action
export const deletePatient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/patients/delete/${id}/`, config);
    dispatch({ type: PATIENT_DELETE_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Get details action
export const getPatientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/patients/${id}`, config);
    dispatch({ type: PATIENT_DETAILS_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// update by admin action
export const updatePatient = (patient) => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/patients/update/${patient._id}/`,
      patient,
      config
    );
    dispatch({ type: PATIENT_UPDATE_SUCESS, payload: data });
    dispatch({ type: PATIENT_DETAILS_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
