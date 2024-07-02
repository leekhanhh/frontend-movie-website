import { ACTOR_DELETE_FAIL, ACTOR_DELETE_REQUEST, ACTOR_DELETE_SUCCESS, ACTOR_DETAIL_FAIL, ACTOR_DETAIL_REQUEST, ACTOR_DETAIL_RESET, ACTOR_DETAIL_SUCCESS, ACTOR_LIST_FAIL, ACTOR_LIST_REQUEST, ACTOR_LIST_RESET, ACTOR_LIST_SUCCESS, ACTOR_REGISTER_FAIL, ACTOR_REGISTER_REQUEST, ACTOR_REGISTER_SUCCESS, ACTOR_UPDATE_FAIL, ACTOR_UPDATE_REQUEST, ACTOR_UPDATE_RESET, ACTOR_UPDATE_SUCCESS } from "../constants/actorConstant";

export const actorsListReducer = (
    state = { loading: true, actors: [] },
    action
  ) => {
    switch (action.type) {
      case ACTOR_LIST_REQUEST:
        return { loading: true, actors: [] };
      case ACTOR_LIST_SUCCESS:
        return { loading: false, actors: action.payload.data.content };
      case ACTOR_LIST_FAIL:
        return { loading: false, error: action.payload };
      case ACTOR_LIST_RESET:
        return { actors: [] };
      default:
        return state;
    }
  };
  
  export const actorRegisterReducer = (
    state = { loading: true, actor: {} },
    action
  ) => {
    switch (action.type) {
      case ACTOR_REGISTER_REQUEST:
        return { loading: true };
      case ACTOR_REGISTER_SUCCESS:
        return { loading: false, success: true, error: "" };
      case ACTOR_REGISTER_FAIL:
        return { loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const actorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ACTOR_DELETE_REQUEST:
        return { loading: true };
      case ACTOR_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ACTOR_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const actorDetailReducer = (state = { actor: {} }, action) => {
    switch (action.type) {
      case ACTOR_DETAIL_REQUEST:
        return { ...state, loading: true };
      case ACTOR_DETAIL_SUCCESS:
        return { loading: false, actor: action.payload.data };
      case ACTOR_DETAIL_FAIL:
        return { loading: false, error: action.payload.data };
      case ACTOR_DETAIL_RESET:
        return { actor: {} };
      default:
        return state;
    }
  };
  
  export const actorUpdateReducer = (state = { actor: {} }, action) => {
    switch (action.type) {
      case ACTOR_UPDATE_REQUEST:
        return { loading: true };
      case ACTOR_UPDATE_SUCCESS:
        return { loading: false, actor: action.payload };
      case ACTOR_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case ACTOR_UPDATE_RESET:
        return { actor: {} };
      default:
        return state;
    }
  };
  