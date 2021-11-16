import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { USER_INFO_REQUEST, USER_INFO_SUCCEED, USER_INFO_FAILED } from "@src/reducer/UserReducer";
import axios from "axios";

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
  return axios.get("/api/user");
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
