import {
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_LIST_RESET,
  ACCOUNT_REGISTER_REQUEST,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_REGISTER_FAIL,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_RESET,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_RESET,
} from "../constants/accountConstant";

export const accountsListReducer = (
  state = { loading: true, accounts: [] },
  action
) => {
  switch (action.type) {
    case ACCOUNT_LIST_REQUEST:
      return { loading: true, accounts: [] };
    case ACCOUNT_LIST_SUCCESS:
      return { loading: false, accounts: action.payload.data.content };
    case ACCOUNT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNT_LIST_RESET:
      return { accounts: [] };
    default:
      return state;
  }
};

export const accountRegisterReducer = (
  state = { loading: true, account: {} },
  action
) => {
  switch (action.type) {
    case ACCOUNT_REGISTER_REQUEST:
      return { loading: true };
    case ACCOUNT_REGISTER_SUCCESS:
      return { loading: false, success: true, error: "" };
    case ACCOUNT_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const accountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_DELETE_REQUEST:
      return { loading: true };
    case ACCOUNT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ACCOUNT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accountDetailReducer = (state = { account: {} }, action) => {
  switch (action.type) {
    case ACCOUNT_DETAIL_REQUEST:
      return { ...state, loading: true };
    case ACCOUNT_DETAIL_SUCCESS:
      return { loading: false, account: action.payload.data };
    case ACCOUNT_DETAIL_FAIL:
      return { loading: false, error: action.payload.data };
    case ACCOUNT_DETAIL_RESET:
      return { account: {} };
    default:
      return state;
  }
};

export const accountUpdateReducer = (state = { account: {} }, action) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_REQUEST:
      return { loading: true };
    case ACCOUNT_UPDATE_SUCCESS:
      return { loading: false, account: action.payload };
    case ACCOUNT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOUNT_UPDATE_RESET:
      return { account: {} };
    default:
      return state;
  }
};
