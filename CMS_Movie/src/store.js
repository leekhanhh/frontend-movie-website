import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import { movieDeleteReducer, movieDetailReducer, movieListReducer, movieRegisterReducer } from "./reducer/movieReducer";
import {
  categoryDeleteReducer,
  categoryDetailReducer,
  categoryGenreListReducer,
  categoryListReducer,
  categoryRegisterReducer,
  categoryUpdateReducer,
  genreListReducer,
} from "./reducer/categoryReducer";

import {uploadImageReducer, uploadVideoReducer } from "./reducer/uploadRecucer";
import { accountDeleteReducer,  accountDetailReducer,  accountRegisterReducer , accountsListReducer, accountUpdateReducer } from "./reducer/accountReducer";
import { actorDeleteReducer, actorDetailReducer, actorRegisterReducer, actorsListReducer, actorUpdateReducer } from "./reducer/actorReducer";
import { episodeDeleteReducer, episodeDetailReducer, episodeRegisterReducer, episodesListReducer, episodeUpdateReducer } from "./reducer/episodeReducer";

const rootReducer = combineReducers({
  accountList: accountsListReducer,
  accountDelete: accountDeleteReducer,
  accountRegister: accountRegisterReducer,
  accountUpdate: accountUpdateReducer,
  accountDetail: accountDetailReducer,

  movieList: movieListReducer,
  movieDelete: movieDeleteReducer,
  movieRegister: movieRegisterReducer,
  movieUpdate: movieDetailReducer,
  movieDetail: movieDetailReducer,

  categoryList: categoryListReducer,
  categoryRegister: categoryRegisterReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetail: categoryDetailReducer,

  actorList: actorsListReducer,
  actorRegister: actorRegisterReducer,
  actorUpdate: actorUpdateReducer,
  actorDelete: actorDeleteReducer,
  actorDetail: actorDetailReducer,

  episodeList: episodesListReducer,
  episodeRegister: episodeRegisterReducer,
  episodeUpdate: episodeUpdateReducer,
  episodeDelete: episodeDeleteReducer,
  episodeDetail: episodeDetailReducer,

  genreList: genreListReducer,
  categoryGenreList: categoryGenreListReducer,

  uploadImage: uploadImageReducer,
  uploadVideo: uploadVideoReducer
});

const userInfoFromStorage =
  localStorage.getItem("userInfo") &&
  localStorage.getItem("userInfo") !== undefined
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
