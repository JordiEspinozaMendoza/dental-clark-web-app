import {
  SERVICE_DELETE_FAIL,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_RESET,
  SERVICE_DELETE_SUCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_RESET,
  SERVICE_DETAILS_SUCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_RESET,
  SERVICE_LIST_SUCESS,
  SERVICE_REGISTER_FAIL,
  SERVICE_REGISTER_REQUEST,
  SERVICE_REGISTER_SUCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_RESET,
  SERVICE_UPDATE_SUCESS,
  SERVICE_REGISTER_RESET,
} from "../constants/serviceConstants";

export const serviceRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_REGISTER_REQUEST:
      return { loading: true };
    case SERVICE_REGISTER_SUCESS:
      return { loading: false, success: true, service: action.payload };
    case SERVICE_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case SERVICE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
export const serviceListReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true };
    case SERVICE_LIST_SUCESS:
      return {
        loading: false,
        success: true,
        services: action.payload.services,
        pages: action.payload.pages,
      };
    case SERVICE_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
export const serviceUpdateReducer = (state = { service: {} }, action) => {
  switch (action.type) {
    case SERVICE_UPDATE_REQUEST:
      return { loading: true };
    case SERVICE_UPDATE_SUCESS:
      return { loading: false, success: true };
    case SERVICE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case SERVICE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const serviceDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return { loading: true };
    case SERVICE_DETAILS_SUCESS:
      return { loading: false, success: true, service: action.payload };
    case SERVICE_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case SERVICE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const serviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DELETE_REQUEST:
      return { loading: true };
    case SERVICE_DELETE_SUCESS:
      return { loading: false, success: true };
    case SERVICE_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case SERVICE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
