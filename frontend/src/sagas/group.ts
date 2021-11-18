import { all, fork, put, call, takeLatest, select, delay } from "redux-saga/effects";
import { GroupAction } from "@src/action";
import axios from "axios";
import { getGroupListApi } from "@src/sagas/user";
import { SET_GROUPS } from "@src/reducer/GroupReducer";

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
interface PostType {
  postID: number;
  postTitle: string;
  postLatitude: number;
  postLongitude: number;
}
interface IAlbum {
  albumID: number;
  albumName: string;
  posts: PostType[];
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

async function createGroupApi(payload: any) {
  const formData = new FormData();
  formData.append("groupImage", payload.groupImage);
  formData.append("groupName", payload.groupName);

  const result = await axios.post(`${SERVER_URL}/api/groups`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return result;
}

async function getAlbumListApi(payload: any) {
  const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupID}/albums`, { withCredentials: true });

  return result;
}

async function deleteGroupApi(payload: any) {
  const result = await axios.delete(`${SERVER_URL}/api/groups/${payload.groupID}`, { withCredentials: true });
  return result;
}

async function getGroupMemberListApi(payload: any) {
  const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupID}`, { withCredentials: true });
  return result;
}

async function requestJoinGroupApi(payload: any) {
  const { code } = payload;

  const result = await axios.post(`${SERVER_URL}/api/groups/join`, { code }, { withCredentials: true });

  return result;
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

    const { groupId, groupName, groupImage } = result.data;

    yield put({ type: "ADD_GROUP", payload: { groupId, groupName, groupImage } });
  } catch (err: any) {}
}

function* getAlbumList(action: any) {
  try {
    const result: ResponseGenerator = yield call(getAlbumListApi, action.payload);

    const { albums } = result.data;
    const { groupID, groupName, groupImg } = action.payload;

    yield put({ type: "SET_ALBUM_LIST", payload: albums });

    const { albumList }: { albumList: IAlbum[] } = yield select((state) => state.groups);
    yield put({ type: "SET_SELECTED_GROUP", payload: { groupID, groupName, groupImg, albumList } });
  } catch (err: any) {}
}

function* deleteGroup(action: any) {
  try {
    const result: ResponseGenerator = yield call(deleteGroupApi, action.payload);
    yield put({ type: "SET_SELECTED_GROUP", payload: null });
    yield put({ type: "DELETE_GROUP", payload: action.payload });
  } catch (err) {}
}

function* getGroupMemberList(action: any) {
  try {
    const result: ResponseGenerator = yield call(getGroupMemberListApi, action.payload);

    yield put({ type: "GET_GROUP_MEMBER_LIST_SUCCEED", payload: result.data });
    yield put({ type: "OPEN_MODAL", payload: "SettingGroupModal" });
  } catch (err) {}
}

function* requestJoinGroup(action: any) {
  try {
    yield call(requestJoinGroupApi, action.payload);
    yield delay(1000);

    const result: ResponseGenerator = yield call(getGroupListApi);
    const { groups } = result.data;

    yield put({ type: SET_GROUPS, payload: groups });
    yield put({ type: "CLOSE_MODAL" });
  } catch (err) {}
}

function* watchGroupInfo() {
  yield takeLatest("REQUEST_GROUP_INFO", getGroupInfo);
}

function* watchCreateGroup() {
  yield takeLatest("CREATE_GROUP", createGroup);
}

function* watchGetAlbumList() {
  yield takeLatest("GET_ALBUM_LIST", getAlbumList);
}

function* watchDeleteGroup() {
  yield takeLatest("REQUEST_DELETE", deleteGroup);
}

function* watchGetGroupMemberList() {
  yield takeLatest("GET_GROUP_MEMBER_LIST", getGroupMemberList);
}

function* watchRequestJoinGroup() {
  yield takeLatest("REQUEST_JOIN_GROUP", requestJoinGroup);
}

export default function* groupSaga() {
  yield all([
    fork(watchGroupInfo),
    fork(watchCreateGroup),
    fork(watchGetAlbumList),
    fork(watchDeleteGroup),
    fork(watchGetGroupMemberList),
    fork(watchRequestJoinGroup),
  ]);
}
