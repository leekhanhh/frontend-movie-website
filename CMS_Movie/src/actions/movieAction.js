import { TrophyFilled } from "@ant-design/icons";
import { clientAxios } from "../config/axios.config";
import { MOVIE_LIST_REQUEST, MOVIE_LIST_SUCCESS, MOVIE_LIST_FAIL, MOVIE_LIST_RESET, MOVIE_DELETE_REQUEST, MOVIE_DELETE_SUCCESS, MOVIE_DELETE_FAIL, MOVIE_REGISTER_FAIL, MOVIE_REGISTER_REQUEST, MOVIE_REGISTER_SUCCESS, MOVIE_DETAIL_FAIL, MOVIE_DETAIL_REQUEST, MOVIE_DETAIL_SUCCESS, MOVIE_UPDATE_FAIL, MOVIE_UPDATE_REQUEST, MOVIE_UPDATE_SUCCESS } from "../constants/movieConstant";

export const listMovie = () => async (dispatch, getState) =>{
    try{
        dispatch({type: MOVIE_LIST_REQUEST})

        const {data}  = await clientAxios.get("/v1/movie/list-server");
        
        dispatch({type: MOVIE_LIST_SUCCESS , payload: data})

    }catch(error){
        dispatch({
            type: MOVIE_LIST_FAIL,
            payload: error.respond && error.respond.data.message ?
            error.respond.data.message
            : error.message
        })
    }
}

export const createMovie = (movieData) => async (dispatch,getState) =>{
    try{
        dispatch({type: MOVIE_REGISTER_REQUEST});

        await clientAxios.post(`/v1/movie/create`,movieData)

        dispatch({type: MOVIE_REGISTER_SUCCESS})

    }catch(error){
        dispatch({
            type: MOVIE_REGISTER_FAIL,
            payload: error.respond && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteMovie = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: MOVIE_DELETE_REQUEST});

        await clientAxios.delete(`/v1/movie/delete/${id}`);

        dispatch({type: MOVIE_DELETE_SUCCESS})


    }catch(error){
        dispatch({
            type: MOVIE_DELETE_FAIL,
            payload: error.respond && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listMovieDetail = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: MOVIE_DETAIL_REQUEST});

        const {data} = await clientAxios.get(`/v1/movie/get-server/${id}`);

        dispatch({type: MOVIE_DETAIL_SUCCESS,payload:data})


    }catch(error) {
        dispatch({
            type: MOVIE_DETAIL_FAIL,
            payload: error.respond && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateMovie = (movieData) => async (dispatch,getState) =>{
    try{
        dispatch({ type: MOVIE_UPDATE_REQUEST});

        const {data} = await clientAxios.put(`/v1/movie/update`,movieData);

        dispatch({type: MOVIE_UPDATE_SUCCESS, payload: data});

    }catch(error){
        dispatch({
            type: MOVIE_UPDATE_FAIL,
            payload: error.respond && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}



