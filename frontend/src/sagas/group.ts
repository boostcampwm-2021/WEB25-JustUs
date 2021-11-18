import { all, fork, put, call, takeLatest, select } from "redux-saga/effects";
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
interface PostType {
  postId: number;
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

function createGroupApi(payload: any) {
  return axios.post(
    `${SERVER_URL}/api/groups`,
    { groupImage: payload.groupImg, groupName: payload.groupName },
    { withCredentials: true },
  );
}

async function getAlbumListApi(payload: any) {
  const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupID}/albums`, { withCredentials: true });

  return result;
}

async function deleteGroupApi(payload: any) {
  const result = await axios.delete(`${SERVER_URL}/api/groups/${payload.groupID}`, { withCredentials: true });
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
    const groupID = result.data;

    yield put({ type: "ADD_GROUP", payload: { groupID, groupName: payload.groupName, groupImg: payload.groupImg } });
  } catch (err: any) {}
}

function* getAlbumList(action: any) {
  try {
    const result: ResponseGenerator = yield call(getAlbumListApi, action.payload);
    const { albums, groupId } = result.data;
    const { groupName, groupImg } = action.payload;

    yield put({ type: "SET_ALBUM_LIST", payload: albums });

    const { albumList }: { albumList: IAlbum[] } = yield select((state) => state.groups);
    yield put({ type: "SET_SELECTED_GROUP", payload: { groupID: groupId, groupName, groupImg, albumList } });
  } catch (err: any) {}
}

function* deleteGroup(action: any) {
  try {
    const result: ResponseGenerator = yield call(deleteGroupApi, action.payload);
    yield put({ type: "SET_SELECTED_GROUP", payload: null });
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
  yield takeLatest("DELETE_GROUP", deleteGroup);
}

export default function* groupSaga() {
  yield all([fork(watchGroupInfo), fork(watchCreateGroup), fork(watchGetAlbumList), fork(watchDeleteGroup)]);
}
