import { EPISODE_DELETE_FAIL, EPISODE_DELETE_REQUEST, EPISODE_DELETE_RESET, EPISODE_DELETE_SUCCESS, EPISODE_DETAIL_FAIL, EPISODE_DETAIL_REQUEST, EPISODE_DETAIL_RESET, EPISODE_DETAIL_SUCCESS, EPISODE_LIST_FAIL, EPISODE_LIST_REQUEST, EPISODE_LIST_RESET, EPISODE_LIST_SUCCESS, EPISODE_REGISTER_FAIL, EPISODE_REGISTER_REQUEST, EPISODE_REGISTER_SUCCESS, EPISODE_UPDATE_FAIL, EPISODE_UPDATE_REQUEST, EPISODE_UPDATE_SUCCESS } from "../constants/episodeConstant";


export const episodesListReducer = (
    state = { loading: true, episodes: [] },
    action
  ) => {
    switch (action.type) {
      case EPISODE_LIST_REQUEST:
        return { loading: true, episodes: [] };
      case EPISODE_LIST_SUCCESS:
        return { loading: false, episodes: action.payload.data.content };
      case EPISODE_LIST_FAIL:
        return { loading: false, error: action.payload };
      case EPISODE_LIST_RESET:
        return { episodes: [] };
      default:
        return state;
    }
  };
  
  export const episodeRegisterReducer = (
    state = { loading: true, episode: {} },
    action
  ) => {
    switch (action.type) {
      case EPISODE_REGISTER_REQUEST:
        return { loading: true };
      case EPISODE_REGISTER_SUCCESS:
        return { loading: false, success: true, error: "" };
      case EPISODE_REGISTER_FAIL:
        return { loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const episodeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EPISODE_DELETE_REQUEST:
        return { loading: true };
      case EPISODE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EPISODE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const episodeDetailReducer = (state = { episode: {} }, action) => {
    switch (action.type) {
      case EPISODE_DETAIL_REQUEST:
        return { ...state, loading: true };
      case EPISODE_DETAIL_SUCCESS:
        return { loading: false, episode: action.payload.data };
      case EPISODE_DETAIL_FAIL:
        return { loading: false, error: action.payload.data };
      case EPISODE_DELETE_RESET:
        return { episode: {} };
      default:
        return state;
    }
  };
  
  export const episodeUpdateReducer = (state = { episode: {} }, action) => {
    switch (action.type) {
      case EPISODE_UPDATE_REQUEST:
        return { loading: true };
      case EPISODE_UPDATE_SUCCESS:
        return { loading: false, episode: action.payload };
      case EPISODE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case EPISODE_DETAIL_RESET:
        return { episode: {} };
      default:
        return state;
    }
  };
  