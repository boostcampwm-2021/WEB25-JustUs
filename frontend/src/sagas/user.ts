import { all, fork, put, call, takeEvery, select } from "redux-saga/effects";
import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCEED,
  USER_INFO_FAILED,
  USER_INFO_UPDATE,
  SET_UPDATED_USER_INFO,
  SET_UPDATE_FAIL,
} from "@src/reducer/UserReducer";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  json: Function;
}
interface IUser {
  userNickName: string;
  userProfile: string;
  userInfoLoading: boolean;
  userInfoSucceed: boolean;
  userInfoError: boolean;
  updateUserNickName: string;
  updateUserProfile: string;
}
function getUserInfoApi() {
  return axios.get(`${SERVER_URL}/api/user`, { withCredentials: true });
}

async function updateUserInfoApi(user: IUser) {
  const result = await axios.put(
    `${SERVER_URL}/api/user`,
    { userNickname: user.updateUserNickName, profileImage: "temp" },
    { withCredentials: true },
  );

  return result;
}

function* getUserInfo() {
  try {
    const result: ResponseGenerator = yield call(getUserInfoApi);
    yield put({ type: USER_INFO_SUCCEED, data: result.data });
  } catch (err: any) {
    yield put({ type: USER_INFO_FAILED, data: "error" });
  }
}

function* updateUserInfo() {
  const user: IUser = yield select((state) => state.user);

  try {
    yield call(updateUserInfoApi, user);
    yield put({
      type: SET_UPDATED_USER_INFO,
      payload: { userNickName: user.updateUserNickName, userProfile: user.updateUserProfile },
    });
  } catch (err: any) {
    yield put({ type: SET_UPDATE_FAIL });
  }
}

function* watchUserInfo() {
  yield takeEvery(USER_INFO_REQUEST, getUserInfo);
}

function* watchUpdateUserInfo() {
  yield takeEvery(USER_INFO_UPDATE, updateUserInfo);
}

export default function* userSaga() {
  yield all([fork(watchUserInfo), fork(watchUpdateUserInfo)]);
}
