import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { GroupAction, ToastAction } from "@src/action";
import axios from "axios";
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

function createAlbumApi(albumName: string, groupId: number) {
  return axios.post(`${SERVER_URL}/api/albums`, { albumName, groupId }, { withCredentials: true });
}

function updateAlbumApi(albumName: string, albumId: number) {
  return axios.put(`${SERVER_URL}/api/albums/${albumId}`, { albumName }, { withCredentials: true });
}

function deleteAlbumApi(albumId: number) {
  return axios.delete(`${SERVER_URL}/api/albums/${albumId}`, { withCredentials: true });
}

function updateAlbumOrderApi(groupId: number, albumOrder: string) {
  return axios.put(`${SERVER_URL}/api/groups/${groupId}/albumorder`, { albumOrder }, { withCredentials: true });
}

function postShiftAlbumApi(postId: number, albumId: number) {
  return axios.put(`${SERVER_URL}/api/posts/${postId}/shift`, { albumId }, { withCredentials: true });
}

function* createAlbum({ payload }: any) {
  try {
    const { albumName, groupId } = payload;
    const result: ResponseGenerator = yield call(createAlbumApi, albumName, groupId);
    yield put({ type: GroupAction.NEW_ALBUM_SUCCEED, payload: { albumName, groupId, albumId: result.data.albumId } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedMakeAlbum(albumName) },
    });
  } catch (err: any) {
    yield put({ type: GroupAction.NEW_ALBUM_FAILED });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedMakeAlbum },
    });
  }
}

function* updateAlbum({ payload }: any) {
  try {
    const { albumName, albumId } = payload;
    yield call(updateAlbumApi, albumName, albumId);
    yield put({ type: GroupAction.UPDATE_ALBUM_SUCCEED, payload: { albumName, albumId } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedUpdateAlbum },
    });
  } catch (err: any) {
    yield put({ type: GroupAction.UPDATE_ALBUM_FAILED });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedUpdateAlbum },
    });
  }
}

function* deleteAlbum({ payload }: any) {
  try {
    const { albumId } = payload;
    yield call(deleteAlbumApi, albumId);
    yield put({ type: GroupAction.DELETE_ALBUM_SUCCEED, payload: { albumId } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedRemoveAlbum },
    });
  } catch (err: any) {
    yield put({ type: GroupAction.DELETE_ALBUM_FAILED });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedRemoveAlbum },
    });
  }
}

function* updateAlbumOrder({ payload }: any) {
  try {
    const { groupId, albumOrder } = payload;
    yield call(updateAlbumOrderApi, groupId, albumOrder);
    yield put({ type: GroupAction.UPDATE_ALBUM_ORDER_SUCCEED, payload: { groupId, albumOrder } });
  } catch (err: any) {
    yield put({ type: GroupAction.UPDATE_ALBUM_ORDER_FAILED });
  }
}

function* postShiftAlbum({ payload }: any) {
  try {
    const { postInfo, albumId } = payload;
    const postId = postInfo.postId;
    yield call(postShiftAlbumApi, postId, albumId);
    yield put({ type: GroupAction.POST_SHIFT_ALBUM_SUCCEED, payload: { postInfo, albumId } });
  } catch (err: any) {
    yield put({ type: GroupAction.POST_SHIFT_ALBUM_FAILED });
  }
}

function* watchAlbumCreate() {
  yield takeLatest(GroupAction.NEW_ALBUM_REQUEST, createAlbum);
}

function* watchAlbumUpdate() {
  yield takeLatest(GroupAction.UPDATE_ALBUM_REQUEST, updateAlbum);
}

function* watchAlbumDelete() {
  yield takeLatest(GroupAction.DELETE_ALBUM_REQUEST, deleteAlbum);
}

function* watchAlbumOrderUpdate() {
  yield takeLatest(GroupAction.UPDATE_ALBUM_ORDER_REQUEST, updateAlbumOrder);
}

function* watchPostShiftAlbum() {
  yield takeLatest(GroupAction.POST_SHIFT_ALBUM_REQUEST, postShiftAlbum);
}

export default function* albumSaga() {
  yield all([
    fork(watchAlbumCreate),
    fork(watchAlbumUpdate),
    fork(watchAlbumDelete),
    fork(watchAlbumOrderUpdate),
    fork(watchPostShiftAlbum),
  ]);
}
