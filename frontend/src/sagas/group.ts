import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { GroupAction } from "@src/action";
import groups from "@src/reducer";
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

function getGroupInfoApi(params: any) {
  const URL = "/api/groups";
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

function createGroupApi(payload: any) {
  return axios.post(
    `${SERVER_URL}/api/groups`,
    { groupImage: payload.groupImg, groupName: payload.groupName },
    { withCredentials: true },
  );
}

function* getGroupInfo(action: any) {
  try {
    const result: ResponseGenerator = yield call(getGroupInfoApi, action.payload);
    yield put({ type: "SUCCESS_GROUP_INFO", data: result.json() });
  } catch (err: any) {
    yield put({ type: "FAILURE_GROUP_INFO", data: err.response.data });
  }
}

function* createGroup({ payload }: any) {
  try {
    const result: ResponseGenerator = yield call(createGroupApi, payload);
    const groupID = result.data;

    yield put({ type: "ADD_GROUP", payload: { groupID, groupName: payload.groupName, groupImg: payload.groupImg } });
  } catch (err: any) {}
}

function* watchGroupInfo() {
  yield takeLatest("REQUEST_GROUP_INFO", getGroupInfo);
}

function* watchCreateGroupInfo() {
  yield takeLatest("CREATE_GROUP", createGroup);
}

export default function* groupSaga() {
  yield all([fork(watchGroupInfo), fork(watchCreateGroupInfo)]);
}
