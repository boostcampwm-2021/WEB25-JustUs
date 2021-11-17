import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { USER_INFO_REQUEST, USER_INFO_SUCCEED, USER_INFO_FAILED } from "@src/reducer/UserReducer";
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

function getUserInfoApi() {
  return axios.get(`${SERVER_URL}/api/user`, { withCredentials: true });
}

function* getUserInfo() {
  try {
    const result: ResponseGenerator = yield call(getUserInfoApi);
    yield put({ type: USER_INFO_SUCCEED, data: result.data });
  } catch (err: any) {
    yield put({ type: USER_INFO_FAILED, data: "error" });
  }
}

function* watchUserInfo() {
  yield takeEvery(USER_INFO_REQUEST, getUserInfo);
}

export default function* userSaga() {
  yield all([fork(watchUserInfo)]);
}
