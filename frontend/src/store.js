import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  patientRegisterReducer,
  patientDeleteReducer,
  patientDetailsReducer,
  patientListReducer,
  patientUpdateReducer,
  patientSearchReducer,
} from "./reducers/patientReducers";

import {
  consultRegisterReducer,
  consultListReducer,
  consultDetailsReducer,
  consultDeleteReducer,
  consultUpdateReducer,
  consultHistoryReducer,
} from "./reducers/consultReducers";
const reducer = combineReducers({
  //Aqui irán los reducers

  // Reducer para los usuarios
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,

  //Reducers para los pacientes
  patientRegister: patientRegisterReducer,
  patientDelete: patientDeleteReducer,
  patientDetails: patientDetailsReducer,
  patientList: patientListReducer,
  patientUpdate: patientUpdateReducer,
  patientSearch: patientSearchReducer,

  //Reducers para las consultas
  consultRegister: consultRegisterReducer,
  consultList: consultListReducer,
  consultDetails: consultDetailsReducer,
  consultDelete: consultDeleteReducer,
  consultUpdate: consultUpdateReducer,
  consultHistory: consultHistoryReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
