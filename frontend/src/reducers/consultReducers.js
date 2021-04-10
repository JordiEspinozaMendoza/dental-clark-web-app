import axios from "axios";

import {
  CONSULT_DELETE_FAIL,
  CONSULT_DELETE_REQUEST,
  CONSULT_DELETE_RESET,
  CONSULT_DELETE_SUCESS,
  CONSULT_DETAILS_FAIL,
  CONSULT_DETAILS_REQUEST,
  CONSULT_DETAILS_RESET,
  CONSULT_DETAILS_SUCESS,
  CONSULT_LIST_FAIL,
  CONSULT_LIST_REQUEST,
  CONSULT_LIST_RESET,
  CONSULT_LIST_SUCESS,
  CONSULT_REGISTER_FAIL,
  CONSULT_REGISTER_REQUEST,
  CONSULT_REGISTER_SUCESS,
  CONSULT_UPDATE_FAIL,
  CONSULT_UPDATE_REQUEST,
  CONSULT_UPDATE_RESET,
  CONSULT_UPDATE_SUCESS,
  CONSULT_REGISTER_RESET,
  CONSULT_HISTORY_FAIL,
  CONSULT_HISTORY_REQUEST,
  CONSULT_HISTORY_RESET,
  CONSULT_HISTORY_SUCESS,
} from "../constants/consultConstants";

//Reducer para el registro de consultas
export const consultRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSULT_REGISTER_REQUEST:
      return { loading: true };
    case CONSULT_REGISTER_SUCESS:
      return { loading: false, success: true };
    case CONSULT_REGISTER_FAIL:
      return { loading: false, success: false };
    default:
      return state;
  }
};
export const consultListReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSULT_LIST_REQUEST:
      return { loading: true };
    case CONSULT_LIST_SUCESS:
      return {
        loading: false,
        success: true,
        consults: action.payload.consults,
        pages: action.payload.pages,
      };
    case CONSULT_LIST_FAIL:
      return { loading: false, success: false };
    default:
      return state;
  }
};
export const consultHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSULT_HISTORY_REQUEST:
      return { loading: true };
    case CONSULT_HISTORY_SUCESS:
      return {
        loading: false,
        success: true,
        consults: action.payload.consults,
        pages: action.payload.pages,
      };
    case CONSULT_HISTORY_FAIL:
      return { loading: false, success: false };
    case CONSULT_HISTORY_RESET:
      return {};
    default:
      return state;
  }
};
export const consultDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSULT_DETAILS_REQUEST:
      return { loading: true };
    case CONSULT_DETAILS_SUCESS:
      return { loading: false, success: true, consult: action.payload };
    case CONSULT_DETAILS_FAIL:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const consultDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSULT_DELETE_REQUEST:
      return { loading: true };
    case CONSULT_DELETE_SUCESS:
      return { loading: false, success: true };
    case CONSULT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CONSULT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const consultUpdateReducer = (state = { consult: {} }, action) => {
  switch (action.type) {
    case CONSULT_UPDATE_REQUEST:
      return { loading: true };
    case CONSULT_UPDATE_SUCESS:
      return { loading: false, success: true };
    case CONSULT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CONSULT_UPDATE_RESET:
      return { consult: {} };

    default:
      return state;
  }
};
