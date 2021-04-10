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
//Reducer para el registro de usuarios
export const patientRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_REGISTER_REQUEST:
      return { loading: true };
    case PATIENT_REGISTER_SUCESS:
      return { loading: false, success: true };
    case PATIENT_REGISTER_FAIL:
      return { loading: false, success: false };
    default:
      return state;
  }
};
//Reducer para obtener detalles del usuario
export const patientDetailsReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PATIENT_DETAILS_SUCESS:
      return { loading: false, patient: action.payload };
    case PATIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_DETAILS_RESET:
      return { patient: {} };

    default:
      return state;
  }
};

//Reducer para eliminar un usuario
export const patientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_DELETE_REQUEST:
      return { loading: true };
    case PATIENT_DELETE_SUCESS:
      return { loading: false, success: true };
    case PATIENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
//Reducer para el listado de usuarios
export const patientListReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true };
    case PATIENT_LIST_SUCESS:
      return { loading: false, success: true, patients: action.payload };
    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_LIST_RESET:
      return { patients: [] };

    default:
      return state;
  }
};
//Reducer para el listado de usuarios
export const patientSearchReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENT_SEARCH_REQUEST:
      return { loading: true };
    case PATIENT_SEARCH_SUCESS:
      return { loading: false, success: true, patients: action.payload };
    case PATIENT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_SEARCH_RESET:
      return { patients: [] };

    default:
      return state;
  }
};

export const patientUpdateReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loading: true };
    case PATIENT_UPDATE_SUCESS:
      return { loading: false, success: true };
    case PATIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_UPDATE_RESET:
      return { patient: {} };

    default:
      return state;
  }
};
