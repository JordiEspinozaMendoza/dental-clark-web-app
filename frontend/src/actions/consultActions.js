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
  CONSULT_SEARCH_FAIL,
  CONSULT_SEARCH_REQUEST,
  CONSULT_SEARCH_RESET,
  CONSULT_SEARCH_SUCESS,
  CONSULT_HISTORY_FAIL,
  CONSULT_HISTORY_SUCESS,
  CONSULT_HISTORY_RESET,
  CONSULT_HISTORY_REQUEST
} from "../constants/consultConstants";

export const register = (consult) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSULT_REGISTER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/consults/create/", consult, config);
    dispatch({ type: CONSULT_REGISTER_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSULT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listConsults = (dateSearch, page) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CONSULT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/consults/getconsults/${dateSearch}/${page}`,
      config
    );
    dispatch({ type: CONSULT_LIST_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSULT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const history = (type, id, page) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSULT_HISTORY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/consults/history/${type}/${id}/${page}`,
      config
    );
    dispatch({ type: CONSULT_HISTORY_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSULT_HISTORY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const consultDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSULT_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/consults/getconsult/${id}/`, config);
    dispatch({ type: CONSULT_DETAILS_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSULT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const consultDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSULT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/consults/delete/${id}/`, config);
    dispatch({ type: CONSULT_DELETE_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSULT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const update = (consult) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSULT_UPDATE_REQUEST });

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
      `/api/consults/update/${consult._id}/`,
      consult,
      config
    );
    dispatch({ type: CONSULT_UPDATE_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONSULT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
