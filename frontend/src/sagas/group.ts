import { all, fork, put, call, takeLatest, select, delay } from "redux-saga/effects";
import axios from "axios";
import { getGroupListApi } from "@src/sagas/user";
import { GroupType } from "@src/reducer/GroupReducer";
import { GroupAction, ToastAction } from "@src/action";
import { toastMessage } from "@src/constants";
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
  albumId: number;
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
  if (payload.groupImage) {
    formData.append("groupImage", payload.groupImage);
  }
  formData.append("groupName", payload.groupName);

  const result = await axios.post(`${SERVER_URL}/api/groups`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return result;
}

async function getAlbumListApi(payload: any) {
  const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupId}/albums`, { withCredentials: true });

  return result;
}

async function deleteGroupApi(payload: any) {
  const result = await axios.delete(`${SERVER_URL}/api/groups/${payload.groupId}`, { withCredentials: true });
  return result;
}

async function getGroupMemberListApi(payload: any) {
  const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupId}`, { withCredentials: true });
  return result;
}

async function requestJoinGroupApi(payload: any) {
  const { code } = payload;

  const result = await axios.post(`${SERVER_URL}/api/groups/join`, { code }, { withCredentials: true });

  return result;
}

async function requestUpdateGroupApi(payload: any) {
  const formData = new FormData();
  formData.append("groupName", payload.groupName);
  if (payload.groupImage) formData.append("groupImage", payload.groupImage);
  formData.append("clearImage", payload.clearImage);

  const result = await axios.put(`${SERVER_URL}/api/groups/${payload.groupId}`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return result;
}

async function requestHashtagsApi(payload: any) {
  const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupId}/hashtags`, { withCredentials: true });
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
    const { groups }: { groups: GroupType[] } = yield select((state) => state.groups);
    const { groupId, groupImage } = result.data;
    const { groupName } = payload;

    yield put({ type: "ADD_GROUP", payload: { groupId, groupName, groupImage, addGroupSucceed: true } });
    yield put({ type: ToastAction.SET_SUCCEED_TOAST, payload: { text: toastMessage.succeedMakeGroup(groupName) } });
    yield put({ type: "SET_SELECTED_GROUP_IDX", payload: { selectedGroupIdx: groups.length } });
  } catch (err: any) {
    yield put({ type: ToastAction.SET_ERROR_TOAST, payload: { text: toastMessage.failedMakeGroup } });
  }
}

function* getAlbumList(action: any) {
  yield put({ type: "SPINNER_OPEN" });
  try {
    const result: ResponseGenerator = yield call(getAlbumListApi, action.payload);
    const { albums } = result.data;
    const { groupId, groupName, groupImage } = action.payload;
    yield put({ type: "SET_ALBUM_LIST", payload: albums });
    const { albumList }: { albumList: IAlbum[] } = yield select((state) => state.groups);
    yield put({ type: "SET_SELECTED_GROUP", payload: { groupId, groupName, groupImage, albumList } });
  } catch (err: any) {
  } finally {
    yield put({ type: "SPINNER_CLOSE" });
  }
}

function* deleteGroup(action: any) {
  try {
    const { selectedGroupIdx }: { selectedGroupIdx: number } = yield select((state) => state.groups);
    const result: ResponseGenerator = yield call(deleteGroupApi, action.payload);
    yield put({
      type: "SET_SELECTED_GROUP_IDX",
      payload: { selectedGroupIdx: selectedGroupIdx - 1 },
    });
    yield put({ type: "DELETE_GROUP", payload: action.payload });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedQuitGroup(action.payload.groupName) },
    });
  } catch (err) {
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedQuitGroup },
    });
  }
}

function* getGroupMemberList(action: any) {
  try {
    const result: ResponseGenerator = yield call(getGroupMemberListApi, action.payload);

    yield put({ type: "GET_GROUP_MEMBER_LIST_SUCCEED", payload: result.data });
    yield put({ type: "OPEN_MODAL", payload: "GroupInfoModal" });
  } catch (err) {}
}

function* requestJoinGroup(action: any) {
  try {
    yield call(requestJoinGroupApi, action.payload);
    yield put({ type: "CLOSE_MODAL" });
    yield delay(300);

    const result: ResponseGenerator = yield call(getGroupListApi);
    const { groups } = result.data;

    yield put({ type: "SET_JOIN_GROUP_SUCCEED", payload: { joinGroupSucceed: true } });
    yield put({ type: GroupAction.GET_GROUP_LIST_SUCCEED, payload: groups });
    yield put({ type: ToastAction.SET_SUCCEED_TOAST, payload: { text: toastMessage.succeedJoinGroup } });
    yield put({ type: "SET_SELECTED_GROUP_IDX", payload: { selectedGroupIdx: groups.length - 1 } });
  } catch (err) {
    yield put({ type: ToastAction.SET_ERROR_TOAST, payload: { text: toastMessage.failedJoinGroup } });
  }
}

function* requestUpdateGroup(action: any) {
  try {
    const result: ResponseGenerator = yield call(requestUpdateGroupApi, action.payload);
    const { groupId, groupName } = action.payload;
    const { groupImage } = result.data;
    const { albumList } = action.payload;
    const result2: ResponseGenerator = yield call(getGroupListApi);
    const { groups } = result2.data;

    yield put({ type: GroupAction.GET_GROUP_LIST_SUCCEED, payload: groups });
    yield put({ type: "SET_SELECTED_GROUP", payload: { groupId, groupName, groupImage, albumList } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedUpdateGroup },
    });
  } catch (err) {
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedUpdateGroup },
    });
  }
}

function* requestHashtags(action: any) {
  try {
    const result: ResponseGenerator = yield call(requestHashtagsApi, action.payload);
    yield put({ type: GroupAction.SET_HASHTAGS, payload: { hashTags: result.data.hashtags, hashTagsError: false } });
  } catch (err) {
    yield put({ type: GroupAction.SET_HASHTAGS, payload: { hashTags: [], hashTagsError: true } });
  }
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

function* watchRequestUpdateGroup() {
  yield takeLatest("REQUEST_UPDATE_GROUP", requestUpdateGroup);
}

function* watchRequestHashtags() {
  yield takeLatest("REQUEST_HASHTAGS", requestHashtags);
}

export default function* groupSaga() {
  yield all([
    fork(watchGroupInfo),
    fork(watchCreateGroup),
    fork(watchGetAlbumList),
    fork(watchDeleteGroup),
    fork(watchGetGroupMemberList),
    fork(watchRequestJoinGroup),
    fork(watchRequestUpdateGroup),
    fork(watchRequestHashtags),
  ]);
}
