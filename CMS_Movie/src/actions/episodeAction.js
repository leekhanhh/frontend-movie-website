import { clientAxios } from "../config/axios.config";
import {
    EPISODE_DELETE_FAIL,
  EPISODE_DELETE_REQUEST,
  EPISODE_DELETE_SUCCESS,
  EPISODE_DETAIL_FAIL,
  EPISODE_DETAIL_REQUEST,
  EPISODE_DETAIL_SUCCESS,
  EPISODE_LIST_FAIL,
  EPISODE_LIST_REQUEST,
  EPISODE_LIST_SUCCESS,
  EPISODE_REGISTER_REQUEST,
  EPISODE_REGISTER_SUCCESS,
  EPISODE_UPDATE_FAIL,
  EPISODE_UPDATE_REQUEST,
  EPISODE_UPDATE_SUCCESS,
} from "../constants/episodeConstant";

export const listEpisodesByMovieID = (movieID) => async (dispatch, getState) => {
  try {
    const params = {};
    if (movieID !== null) {
      params.movieId = movieID;
    }
    console.log(movieID)
    dispatch({ type: EPISODE_LIST_REQUEST });

    const {data} = await clientAxios.get(`/v1/episode/get-episode-list-by-movie`,{params})

    console.log(data);

    dispatch({type: EPISODE_LIST_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type: EPISODE_LIST_FAIL,
      payload:
        error.respond && error.respond.data.message
          ? error.respond.data.message
          : error.message,
    });
  }
};

export const createEpisode = (episodeData) => async (dispatch, getState) =>{
    try{
        dispatch({type: EPISODE_REGISTER_REQUEST}); 

        await clientAxios.post(`/v1/episode/create-episode`,episodeData);

        dispatch({type: EPISODE_REGISTER_SUCCESS})

    }catch(error){
        dispatch({
            type: EPISODE_REGISTER_REQUEST,
            payload: error.respond && error.respond.data.message
            ? error.respond.data.message
            : error.message,
        })
    }
}


export const deleteEpisode = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: EPISODE_DELETE_REQUEST});

        await clientAxios.delete(`/v1/episode/delete-episode/${id}`);

        dispatch({type: EPISODE_DELETE_SUCCESS});
    }catch(error) {
        dispatch({
            type: EPISODE_DELETE_FAIL,
            payload: error.respond && error.respond.data.message
            ? error.respond.data.message
            : error.message,
        })
    }
}

export const updateEpisode = (episodeData) => async (dispatch, getState) => {
    try{
        dispatch({type: EPISODE_UPDATE_REQUEST});

        const {data} =  await clientAxios.put(`/v1/episode/update-episode`,episodeData);

        dispatch({type: EPISODE_UPDATE_SUCCESS, payload: data})
        
    }catch(error){
        dispatch({type: EPISODE_UPDATE_FAIL,
            payload:error.respond && error.respond.data.message
            ? error.respond.data.message
            : error.message,
        })
    }
}

export const listEpisodeDetail = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: EPISODE_DETAIL_REQUEST});
        console.log('hello')

        const {data} = await clientAxios.get(`/v1/episode/get-episode-by-id/${id}`);
        console.log(data);

        dispatch({type: EPISODE_DETAIL_SUCCESS, payload: data})

    }catch(error){
        dispatch({
            type: EPISODE_DETAIL_FAIL,
            payload: error.respond && error.respond.data.message
            ? error.respond.data.message
            : error.message,
        })
    }
}