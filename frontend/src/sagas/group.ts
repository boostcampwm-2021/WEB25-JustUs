import { all, fork, put, call, takeLatest, select, delay } from "redux-saga/effects";
import { getGroupListApi } from "@src/sagas/user";
import { GroupType } from "@src/reducer/GroupReducer";
import { GroupAction, ToastAction } from "@src/action";
import { GroupAPI } from "@src/api";
import { refresh } from "./index";

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
  return GroupAPI.getGroupInfoApi(params);
}

async function createGroupApi(payload: any) {
  return GroupAPI.createGroup(payload);
}

async function getAlbumListApi(payload: any) {
  return GroupAPI.getAlbumList(payload);
}

async function deleteGroupApi(payload: any) {
  return GroupAPI.deleteGroup(payload);
}

async function getGroupMemberListApi(payload: any) {
  return GroupAPI.getGroupMemberList(payload);
}

async function requestJoinGroupApi(payload: any) {
  return GroupAPI.joinGroup(payload);
}

async function requestUpdateGroupApi(payload: any) {
  return GroupAPI.updateGroup(payload);
}

async function requestHashtagsApi(payload: any) {
  return GroupAPI.getHashtags(payload);
}

function* getGroupInfo(action: any) {
  try {
    const result: ResponseGenerator = yield call(getGroupInfoApi, action.payload);
    yield put({ type: "SUCCESS_GROUP_INFO", data: result.json() });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.REQUEST_GROUP_INFO, action });
      }
    } else {
      yield put({ type: "FAILURE_GROUP_INFO", data: err.response.data });
    }
  }
}

function* createGroup({ payload }: any) {
  try {
    const result: ResponseGenerator = yield call(createGroupApi, payload);
    const { groups }: { groups: GroupType[] } = yield select((state) => state.groups);
    const { groupId, groupImage } = result.data;
    const { groupName } = payload;

    yield put({ type: "ADD_GROUP", payload: { groupId, groupName, groupImage, addGroupSucceed: true } });
    yield put({ type: ToastAction.SET_SUCCEED_TOAST, payload: { text: `${groupName} 그룹 생성에 성공했습니다.` } });
    yield put({ type: "SET_SELECTED_GROUP_IDX", payload: { selectedGroupIdx: groups.length } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.CREATE_GROUP, payload });
      }
    } else {
      yield put({ type: ToastAction.SET_ERROR_TOAST, payload: { text: `그룹 생성에 실패했습니다.` } });
    }
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
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.GET_ALBUM_LIST, action });
      }
    }
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
      payload: { text: `${action.payload.groupName} 그룹에서 탈퇴했습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.DELETE_GROUP, action });
      }
    }
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: `그룹 탈퇴에 실패했습니다.` },
    });
  }
}

function* getGroupMemberList(action: any) {
  try {
    const result: ResponseGenerator = yield call(getGroupMemberListApi, action.payload);

    yield put({ type: "GET_GROUP_MEMBER_LIST_SUCCEED", payload: result.data });
    yield put({ type: "OPEN_MODAL", payload: "GroupInfoModal" });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.GET_GROUP_MEMBER_LIST, action });
      }
    }
  }
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
    yield put({ type: ToastAction.SET_SUCCEED_TOAST, payload: { text: `그룹에 참여했습니다.` } });
    yield put({ type: "SET_SELECTED_GROUP_IDX", payload: { selectedGroupIdx: groups.length - 1 } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.REQUEST_JOIN_GROUP, action });
      }
    } else {
      yield put({ type: ToastAction.SET_ERROR_TOAST, payload: { text: `그룹 참여에 실패했습니다.` } });
    }
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
      payload: { text: `그룹 정보가 수정되었습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.REQUEST_UPDATE_GROUP, payload: action.payload });
      }
    } else {
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: `그룹 정보 수정에 실패했습니다.` },
      });
    }
  }
}

function* requestHashtags(action: any) {
  try {
    const result: ResponseGenerator = yield call(requestHashtagsApi, action.payload);
    yield put({ type: GroupAction.SET_HASHTAGS, payload: { hashTags: result.data.hashtags, hashTagsError: false } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.REQUEST_HASHTAGS, payload: action.payload });
      }
    } else {
      yield put({ type: GroupAction.SET_HASHTAGS, payload: { hashTags: [], hashTagsError: true } });
    }
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
