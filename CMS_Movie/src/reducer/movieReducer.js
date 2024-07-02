
import {
    MOVIE_LIST_REQUEST,
    MOVIE_LIST_SUCCESS,
    MOVIE_LIST_FAIL,
    MOVIE_LIST_RESET,
    MOVIE_REGISTER_REQUEST,
    MOVIE_REGISTER_SUCCESS,
    MOVIE_REGISTER_RESET,
    MOVIE_REGISTER_FAIL,
    MOVIE_DELETE_REQUEST,
    MOVIE_DELETE_SUCCESS,
    MOVIE_DELETE_FAIL,
    MOVIE_UPDATE_REQUEST,
    MOVIE_UPDATE_SUCCESS,
    MOVIE_UPDATE_FAIL,
    MOVIE_UPDATE_RESET,
    MOVIE_DETAIL_REQUEST,
    MOVIE_DETAIL_SUCCESS,
    MOVIE_DETAIL_FAIL,
    MOVIE_DETAIL_RESET,U
  } from "../constants/movieConstant";
  
  export const movieListReducer = (state = { loading: true, movieList: [] }, action) => {
    switch (action.type) {
      case MOVIE_LIST_REQUEST:
        return { loading: true, movieList: [] };
      case MOVIE_LIST_SUCCESS:
        return {
          loading: false,
          movieList: action.payload.data.content,
        };
      case MOVIE_LIST_FAIL:
        return { loading: false, error: action.payload };
      case MOVIE_LIST_RESET:
        return { movieList: [] };
      default:
        return state; 
    }
  };

  export const movieRegisterReducer = (state = {loading: true, movie:{}},action) =>{
     switch (action.type){
        case MOVIE_REGISTER_REQUEST:
            return {loading: true};
        case MOVIE_REGISTER_SUCCESS:
            return {loading: false, success: true, error: ""};
        case MOVIE_REGISTER_FAIL:
            return {loading: false, success: false, error: action.payload};
        default: 
            return state;
     }
  }


  export const movieDeleteReducer = (state = {}, action) =>{
    switch (action.type){
        case MOVIE_DELETE_REQUEST:
            return {loading: true};
        case MOVIE_DELETE_SUCCESS:
            return {loading: false, success: true};
        case MOVIE_DELETE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
  }

  export const movieDetailReducer = (state = {movie:{}}, action) => {
    switch (action.type){
      case MOVIE_DETAIL_REQUEST:
        return {...state, loading:true};
      case MOVIE_DETAIL_SUCCESS:
        return {loading: false, movie: action.payload.data};
      case MOVIE_DETAIL_FAIL:
        return {loading: false, error: action.payload.data};
      case MOVIE_DETAIL_RESET:
        return {movie: {}}
      default:
        return state;
    }
  }

  export const movieUpdateReducer = (state = {movie: {}}, action) =>{
    switch (action.type){
      case MOVIE_UPDATE_REQUEST:
        return {loading: true};
      case MOVIE_UPDATE_SUCCESS:
        return {loading: false, success: true, movie: action.payload};
      case MOVIE_UPDATE_FAIL:
        return {loading: false, error: action.payload};
      case MOVIE_UPDATE_RESET:
        return {movie: {}}
      default:
        return state;
    }
  }

  