import { clientAxios } from "../config/axios.config";
import { ACTOR_DELETE_FAIL, ACTOR_DELETE_REQUEST, ACTOR_DELETE_SUCCESS, ACTOR_DETAIL_REQUEST, ACTOR_DETAIL_SUCCESS, ACTOR_LIST_FAIL, ACTOR_LIST_REQUEST, ACTOR_LIST_SUCCESS, ACTOR_REGISTER_FAIL, ACTOR_REGISTER_REQUEST, ACTOR_REGISTER_SUCCESS, ACTOR_UPDATE_FAIL, ACTOR_UPDATE_REQUEST, ACTOR_UPDATE_SUCCESS } from "../constants/actorConstant";

export const listActorByMovieID = (movieID) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTOR_LIST_REQUEST });
    const params = {};
    if (movieID !== null) {
      params.movieId = movieID;
    }
    const { data } = await clientAxios.get(`/v1/participant/list`, {
      params,
    });



    dispatch({ type: ACTOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTOR_LIST_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};

export const createActor = (actor) => async (dispatch, getState) => {
    try {
      dispatch({ type: ACTOR_REGISTER_REQUEST });
  
      // Make the API call to create the actor
       await clientAxios.post('/v1/participant/create', actor);
  
      dispatch({ type: ACTOR_REGISTER_SUCCESS });
    } catch (error) {
      dispatch({
        type: ACTOR_REGISTER_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      });
    }
  };

export const deleteActor = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTOR_DELETE_REQUEST });

    const request = await clientAxios.delete(`/v1/participant/delete/${id}`);

    console.log(request);

    dispatch({ type: ACTOR_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ACTOR_DELETE_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};

export const updateActor = (actorData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTOR_UPDATE_REQUEST });

    const { data } = await clientAxios.put(
      `/v1/participant/update`,
      actorData
    );

    dispatch({ type: ACTOR_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTOR_UPDATE_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};

export const listActorDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACTOR_DETAIL_REQUEST });
    

    const { data } = await clientAxios.get(`/v1/participant/detail/${id}`);

    dispatch({ type: ACTOR_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTOR_DELETE_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};
