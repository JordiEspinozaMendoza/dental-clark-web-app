import axios from "axios";
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

export const createService = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_REGISTER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/services/create/", {}, config);
    dispatch({ type: SERVICE_REGISTER_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const listServices = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_LIST_REQUEST });
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
      `/api/services/getservices/${page}/`,
      config
    );
    dispatch({ type: SERVICE_LIST_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const updateService = (service) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_UPDATE_REQUEST });
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
      `/api/services/update/${service._id}/`,
      service,
      config
    );
    dispatch({ type: SERVICE_UPDATE_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const getServiceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/services/getservice/${id}/`, config);
    dispatch({ type: SERVICE_DETAILS_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteService = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/services/delete/${id}/`, config);
    dispatch({ type: SERVICE_DELETE_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
