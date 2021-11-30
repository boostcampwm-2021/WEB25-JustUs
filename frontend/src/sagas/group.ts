import { all, fork, put, call, takeLatest, select, delay } from "redux-saga/effects";
import { getGroupListApi } from "@src/sagas/user";
import { GroupType } from "@src/reducer/GroupReducer";
import { SpinnerAction, ToastAction, GroupAction, ModalAction } from "@src/action";
import { modal, toastMessage } from "@src/constants";
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
    yield put({ type: GroupAction.SUCCESS_GROUP_INFO, data: result.json() });
  } catch (err: any) {
    const { status } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.REQUEST_GROUP_INFO, payload: action.payload });
    } else {
      yield put({ type: GroupAction.FAILURE_GROUP_INFO, data: err.response.data });
    }
  }
}

function* createGroup({ payload }: any) {
  try {
    const result: ResponseGenerator = yield call(createGroupApi, payload);
    const { groups }: { groups: GroupType[] } = yield select((state) => state.groups);
    const { groupId, groupImage } = result.data;
    const { groupName } = payload;

    yield put({ type: GroupAction.ADD_GROUP, payload: { groupId, groupName, groupImage, addGroupSucceed: true } });
    yield put({ type: ToastAction.SET_SUCCEED_TOAST, payload: { text: toastMessage.succeedMakeGroup(groupName) } });
    yield put({ type: GroupAction.SET_SELECTED_GROUP_IDX, payload: { selectedGroupIdx: groups.length } });
  } catch (err: any) {
    const { status } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.CREATE_GROUP, payload });
    } else {
      yield put({ type: ToastAction.SET_ERROR_TOAST, payload: { text: toastMessage.failedMakeGroup } });
    }
  }
}

function* getAlbumList(action: any) {
  yield put({ type: SpinnerAction.SPINNER_OPEN });
  try {
    const result: ResponseGenerator = yield call(getAlbumListApi, action.payload);
    const { albums } = result.data;
    const { groupId, groupName, groupImage } = action.payload;
    yield put({ type: GroupAction.SET_ALBUM_LIST, payload: albums });
    const { albumList }: { albumList: IAlbum[] } = yield select((state) => state.groups);
    yield put({ type: GroupAction.SET_SELECTED_GROUP, payload: { groupId, groupName, groupImage, albumList } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.GET_ALBUM_LIST, payload: action.payload });
    }
  } finally {
    yield put({ type: SpinnerAction.SPINNER_CLOSE });
  }
}

function* deleteGroup(action: any) {
  try {
    const { selectedGroupIdx }: { selectedGroupIdx: number } = yield select((state) => state.groups);
    yield call(deleteGroupApi, action.payload);
    yield put({
      type: GroupAction.SET_SELECTED_GROUP_IDX,
      payload: { selectedGroupIdx: selectedGroupIdx - 1 },
    });
    yield put({ type: GroupAction.DELETE_GROUP, payload: action.payload });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedQuitGroup(action.payload.groupName) },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.DELETE_GROUP, payload: action.payload });
    }
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedQuitGroup },
    });
  }
}

function* getGroupMemberList(action: any) {
  try {
    const result: ResponseGenerator = yield call(getGroupMemberListApi, action.payload);

    yield put({ type: GroupAction.GET_GROUP_MEMBER_LIST_SUCCEED, payload: result.data });
    yield put(ModalAction.openModalAction(modal.GroupInfoModal));
  } catch (err: any) {
    const { status } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.GET_GROUP_MEMBER_LIST, payload: action.payload });
    }
  }
}

function* requestJoinGroup(action: any) {
  try {
    yield call(requestJoinGroupApi, action.payload);
    yield put({ type: ModalAction.CLOSE_MODAL });
    yield delay(300);

    const result: ResponseGenerator = yield call(getGroupListApi);
    const { groups } = result.data;

    yield put({ type: GroupAction.SET_JOIN_GROUP_SUCCEED, payload: { joinGroupSucceed: true } });
    yield put({ type: GroupAction.GET_GROUP_LIST_SUCCEED, payload: groups });
    yield put({ type: ToastAction.SET_SUCCEED_TOAST, payload: { text: toastMessage.succeedJoinGroup } });
    yield put({ type: GroupAction.SET_SELECTED_GROUP_IDX, payload: { selectedGroupIdx: groups.length - 1 } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.REQUEST_JOIN_GROUP, payload: action.payload });
    } else {
      yield put({ type: ToastAction.SET_ERROR_TOAST, payload: { text: toastMessage.failedJoinGroup } });
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
    yield put({ type: GroupAction.SET_SELECTED_GROUP, payload: { groupId, groupName, groupImage, albumList } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedUpdateGroup },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.REQUEST_UPDATE_GROUP, payload: action.payload });
    } else {
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: toastMessage.failedUpdateGroup },
      });
    }
  }
}

function* requestHashtags(action: any) {
  try {
    const result: ResponseGenerator = yield call(requestHashtagsApi, action.payload);
    yield put({ type: GroupAction.SET_HASHTAGS, payload: { hashTags: result.data.hashtags, hashTagsError: false } });
  } catch (err: any) {
    const { status } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.REQUEST_HASHTAGS, payload: action.payload });
    } else {
      yield put({ type: GroupAction.SET_HASHTAGS, payload: { hashTags: [], hashTagsError: true } });
    }
  }
}

function* watchGroupInfo() {
  yield takeLatest(GroupAction.REQUEST_GROUP_INFO, getGroupInfo);
}

function* watchCreateGroup() {
  yield takeLatest(GroupAction.CREATE_GROUP, createGroup);
}

function* watchGetAlbumList() {
  yield takeLatest(GroupAction.GET_ALBUM_LIST, getAlbumList);
}

function* watchDeleteGroup() {
  yield takeLatest(GroupAction.REQUEST_DELETE, deleteGroup);
}

function* watchGetGroupMemberList() {
  yield takeLatest(GroupAction.GET_GROUP_MEMBER_LIST, getGroupMemberList);
}

function* watchRequestJoinGroup() {
  yield takeLatest(GroupAction.REQUEST_JOIN_GROUP, requestJoinGroup);
}

function* watchRequestUpdateGroup() {
  yield takeLatest(GroupAction.REQUEST_UPDATE_GROUP, requestUpdateGroup);
}

function* watchRequestHashtags() {
  yield takeLatest(GroupAction.REQUEST_HASHTAGS, requestHashtags);
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
