
import { clientAxios } from "../config/axios.config";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_FAIL,
  GENRE_LIST_REQUEST,
  GENRE_LIST_FAIL,
  GENRE_LIST_SUCCESS,
  GENRE_LIST_RESET,
  CATEGORY_GENRE_LIST_REQUEST,
  CATEGORY_GENRE_LIST_SUCCESS,
  CATEGORY_GENRE_LIST_FAIL,
  CATEGORY_GENRE_LIST_RESET,
  CATEGORY_REGISTER_REQUEST,
  CATEGORY_REGISTER_SUCCESS,
  CATEGORY_REGISTER_FAIL,
  CATEGORY_REGISTER_RESET,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS
} from "../constants/categoryConstant";



export const listAllCategoryAndGenre = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_GENRE_LIST_REQUEST });

    const { data } = await clientAxios.get(`/v1/category/list`);

    dispatch({
      type: CATEGORY_GENRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_GENRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listCategories = () => async (dispatch, getState) => {
  const kind = 0;
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const param = { kind: kind };
    const { data } = await clientAxios.get(`/v1/category/auto-complete`, {
      params: param,
    });

    console.log(data);
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch,getState) => {
  try{
    dispatch({type: CATEGORY_DELETE_REQUEST})

    await clientAxios.delete(`/v1/category/delete/${id}`);

    dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data})
    
  }catch(error){
    dispatch(
      {
        type: CATEGORY_DELETE_FAIL,
        payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      }
    )
  }
}

export const updateCategory = (categoryData) => async (dispatch, getState) =>{
  try{
    dispatch({type: CATEGORY_UPDATE_REQUEST})

    const {data} =  await clientAxios.put(`/v1/category/update`,categoryData);

    dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data})


  }catch(error){
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listDetailCategory = (id) => async (dispatch, getState) =>{
  try{
    dispatch({type: CATEGORY_DETAIL_REQUEST});

    const {data} = await clientAxios.get(`/v1/category/get/${id}`);
    console.log(data)
    dispatch({type: CATEGORY_DETAIL_SUCCESS, payload: data})

  }catch(error){
    dispatch({
      type: CATEGORY_DETAIL_REQUEST,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listGenre = () => async (dispatch, getState) => {
  const kind = 1;
  try {
    dispatch({ type: GENRE_LIST_REQUEST });

    const param = { kind: kind };
    const { data } = await clientAxios.get(`/v1/category/auto-complete`, {
      params: param,
    });

    console.log(data);

    dispatch({
      type: GENRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (categoryData) => async (dispatch, getState) => {
  try{ 
    dispatch({type: CATEGORY_GENRE_LIST_REQUEST});

    const {data} = await clientAxios.post(`/v1/category/create`,categoryData)

    dispatch({
      type: CATEGORY_REGISTER_SUCCESS,
      payload: data
    })

  }catch(error){
    dispatch({
      type: CATEGORY_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};
