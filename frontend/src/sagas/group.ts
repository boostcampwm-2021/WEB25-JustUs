import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { GroupAction } from "@src/action";
import groups from "@src/reducer";

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  json: Function;
}

function getGroupInfoApi(params: any) {
  const URL = "http://localhost:5000/api";
  const option = {
    method: "GET",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId: params.groupId,
    }),
  };
  return fetch(URL, option);
}

function* getGroupInfo(action: any) {
  try {
    const result: ResponseGenerator = yield call(getGroupInfoApi, action.payload);
    yield put({ type: "SUCCESS_GROUP_INFO", data: result.json() });
  } catch (err: any) {
    yield put({ type: "FAILURE_GROUP_INFO", data: err.response.data });
  }
}

function* watchGroupInfo() {
  yield takeLatest("REQUEST_GROUP_INFO", getGroupInfo);
}

export default function* groupSaga() {
  yield all([fork(watchGroupInfo)]);
}
