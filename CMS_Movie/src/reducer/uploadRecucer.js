import { UPLOAD_FILE_REQUEST, UPLOAD_FILE_RESET, UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS, UPLOAD_FILE_SUCCESS, UPLOAD_VIDEO_FAIL, UPLOAD_FILE_FAIL, UPLOAD_VIDEO_RESET} from "../constants/uploadConstant";
export const uploadImageReducer = (state = {}, action) =>{
    switch(action.type){
        case UPLOAD_FILE_REQUEST:
            return {loading: true}
        case UPLOAD_FILE_SUCCESS:
            return {loading: false, success: true}
        case UPLOAD_FILE_FAIL:
            return {loading: false, error: action.payload}
        case UPLOAD_FILE_RESET:
            return {}
        default:
            return state;
    }
}

export const uploadVideoReducer = (state = {}, action) =>{
    switch(action.type){
        case UPLOAD_VIDEO_REQUEST:
            return {loading: true};
        case UPLOAD_VIDEO_SUCCESS:
            return {loading: false, success: true}
        case UPLOAD_VIDEO_FAIL:
            return {loading: false, error: action.payload}
        case UPLOAD_VIDEO_RESET:
            return {}
        default:
            return state;
    }
}