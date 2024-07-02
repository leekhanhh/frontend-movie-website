
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_LIST_RESET,
  CATEGORY_GENRE_LIST_REQUEST,
  CATEGORY_GENRE_LIST_SUCCESS,
  CATEGORY_GENRE_LIST_FAIL,
  CATEGORY_GENRE_LIST_RESET,
  CATEGORY_REGISTER_REQUEST,
  CATEGORY_REGISTER_FAIL,
  CATEGORY_REGISTER_RESET,
  CATEGORY_REGISTER_SUCCESS,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_RESET,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_RESET
} from "../constants/categoryConstant";

export const categoryGenreListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_GENRE_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_GENRE_LIST_SUCCESS:
      return { loading: false, categories: action.payload.data.content };
    case CATEGORY_GENRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_GENRE_LIST_RESET:
      return { categories: [] };
    default:
      return state;
  }
};



export const categoryRegisterReducer =(
  state = {loading: true, category:{}},action
) =>{
  switch (action.type){
    case CATEGORY_GENRE_LIST_REQUEST:
      return { loading: true};
    case CATEGORY_GENRE_LIST_SUCCESS:
      return { loading: false, success: true, error: ""};
    case CATEGORY_GENRE_LIST_FAIL:
      return { loading: false, success: false, error: action.payload};
    default: 
      return state;
  }
}

export const categoryUpdateReducer = (state = {category: {}},action) =>{
  switch (action.type){
    case CATEGORY_UPDATE_REQUEST:
      return {loading: true};
    case CATEGORY_UPDATE_SUCCESS:
      return {loading: false, success: true, category: action.payload};
    case CATEGORY_UPDATE_FAIL:
      return {loading: false, error: action.payload};
    case CATEGORY_UPDATE_RESET:
      return {category: {}}
    default:
      return state; 
  }
}

export const categoryDeleteReducer = (state = {},action) =>{
  switch (action.type){
    case CATEGORY_DELETE_REQUEST:
      return {loading: true};
    case CATEGORY_DELETE_SUCCESS:
      return {loading: false, success: true};
    case CATEGORY_DELETE_FAIL:
      return {loading: false, error: action.payload};
    case CATEGORY_DELETE_RESET:
      return {};
    default: 
      return state;
  }
}

export const categoryDetailReducer = (state = {category: {}},action)=>{
  switch (action.type){
    case CATEGORY_DETAIL_REQUEST:
      return {...state, loading:true};
    case CATEGORY_DETAIL_SUCCESS:
      return {loading: false, category: action.payload.data};
    case CATEGORY_DETAIL_FAIL:
      return {loading: false, error: action.payload.data};
    case CATEGORY_DETAIL_RESET:
      return {category:{}};
    default:
      return state;
  }
}

export const categoryListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload.data.content,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_LIST_RESET:
      return { categories: [] };
    default:
      return state;
  }
};

export const genreListReducer = (
  state = { loading: true, genries: [] },
  action
) => {
  switch (action.type) {
    case GENRE_LIST_REQUEST:
      return { loading: true, genries: [] };
    case GENRE_LIST_SUCCESS:
      return {
        loading: false,
        genries: action.payload.data.content,
      };
    case GENRE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GENRE_LIST_RESET:
      return { genries: [] };
    default:
      return state;
  }
};
