import { clientAxios } from "../config/axios.config";
import { UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL, UPLOAD_VIDEO_SUCCESS, UPLOAD_VIDEO_FAIL,UPLOAD_VIDEO_REQUEST } from "../constants/uploadConstant";

export const uploadImage = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_FILE_REQUEST });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');
    console.log(file)

    const  respond  = await clientAxios.post('/v1/file/upload-file/s3', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(respond.data)

    
    dispatch({ type: UPLOAD_FILE_SUCCESS, payload: respond.data });
  } catch (error) {
    dispatch({
      type: UPLOAD_FILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    console.log(error)
  }
};

export const uploadVideo = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_VIDEO_REQUEST });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bandwidth', '1080p');
    console.log('hello')

    const response = await clientAxios.post('/v1/file/upload-video/s3', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response);
    dispatch({ type: UPLOAD_VIDEO_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: UPLOAD_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error)
  }
};