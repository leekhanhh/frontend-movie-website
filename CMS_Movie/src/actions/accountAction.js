
import { clientAxios } from "../config/axios.config";
import {
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_REGISTER_REQUEST,
  ACCOUNT_REGISTER_FAIL,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
} from "../constants/accountConstant";

// RoleID = 1 : List User Account
// RoleID = 0 : List Admin Account
// RoleID = null : List All Account
export const listAllAccounts =
  (roleID = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ACCOUNT_LIST_REQUEST });
      const params = {};
      if (roleID !== null) {
        params.roleID = roleID;
      }
      const { data } = await clientAxios.get(`/v1/account/list-admin`, {
        params,
      });

      dispatch({ type: ACCOUNT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACCOUNT_LIST_FAIL,
        payload:
          error.respond && error.respond.data.message
            ? error.respond.data.message
            : error.message,
      });
    }
  };

export const createAccount = (accountData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCOUNT_REGISTER_REQUEST });

    await clientAxios.post(`/v1/account/create-admin`, accountData);

    dispatch({ type: ACCOUNT_REGISTER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ACCOUNT_REGISTER_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};

export const deleteAccount = (id) => async (dispatch, getState) =>{
  try{
    dispatch({type: ACCOUNT_DELETE_REQUEST})

    const request =  await clientAxios.delete(`/v1/account/delete-admin/${id}`)

    console.log(request)

    dispatch({type: ACCOUNT_DELETE_SUCCESS})

  }catch(error){
    dispatch({
      type: ACCOUNT_DELETE_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    })
  }
}

export const updateAccount = (accountData) => async (dispatch, getState) => {
  try {
    dispatch({type: ACCOUNT_UPDATE_REQUEST});

    const {data} = await clientAxios.put(`v1/account/update-admin`,accountData);

    dispatch({type: ACCOUNT_UPDATE_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type: ACCOUNT_UPDATE_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};

export const listAccountDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCOUNT_DETAIL_REQUEST });

    const {data} = await clientAxios.get(`/v1/account/get-admin/${id}`);


    dispatch({ type: ACCOUNT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACCOUNT_DETAIL_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};
