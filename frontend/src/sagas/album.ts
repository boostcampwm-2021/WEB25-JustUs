import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
  NEW_ALBUM_REQUEST,
  NEW_ALBUM_SUCCEED,
  NEW_ALBUM_FAILED,
  UPDATE_ALBUM_REQUEST,
  UPDATE_ALBUM_SUCCEED,
  UPDATE_ALBUM_FAILED,
  DELETE_ALBUM_REQUEST,
  DELETE_ALBUM_SUCCEED,
  DELETE_ALBUM_FAILED,
  UPDATE_ALBUM_ORDER_REQUEST,
  UPDATE_ALBUM_ORDER_SUCCEED,
  UPDATE_ALBUM_ORDER_FAILED,
  POST_SHIFT_ALBUM_REQUEST,
  POST_SHIFT_ALBUM_SUCCEED,
  POST_SHIFT_ALBUM_FAILED,
} from "@src/reducer/GroupReducer";
import { SET_SUCCEED_TOAST } from "@src/reducer/ToastReducer";
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
    yield put({ type: NEW_ALBUM_SUCCEED, payload: { albumName, groupId, albumId: result.data.albumId } });
    yield put({
      type: SET_SUCCEED_TOAST,
      payload: { text: `${albumName} 앨범이 생성되었습니다.`, isSucceed: true, isError: false },
    });
  } catch (err: any) {
    yield put({ type: NEW_ALBUM_FAILED });
  }
}

function* updateAlbum({ payload }: any) {
  try {
    const { albumName, albumId } = payload;
    yield call(updateAlbumApi, albumName, albumId);
    yield put({ type: UPDATE_ALBUM_SUCCEED, payload: { albumName, albumId } });
    yield put({
      type: SET_SUCCEED_TOAST,
      payload: { text: `앨범 정보가 수정되었습니다.`, isSucceed: true, isError: false },
    });
  } catch (err: any) {
    yield put({ type: UPDATE_ALBUM_FAILED });
  }
}

function* deleteAlbum({ payload }: any) {
  try {
    const { albumId } = payload;
    yield call(deleteAlbumApi, albumId);
    yield put({ type: DELETE_ALBUM_SUCCEED, payload: { albumId } });
    yield put({
      type: SET_SUCCEED_TOAST,
      payload: { text: `앨범이 삭제되었습니다.`, isSucceed: true, isError: false },
    });
  } catch (err: any) {
    yield put({ type: DELETE_ALBUM_FAILED });
  }
}

function* updateAlbumOrder({ payload }: any) {
  try {
    const { groupId, albumOrder } = payload;
    yield call(updateAlbumOrderApi, groupId, albumOrder);
    yield put({ type: UPDATE_ALBUM_ORDER_SUCCEED, payload: { groupId, albumOrder } });
  } catch (err: any) {
    yield put({ type: UPDATE_ALBUM_ORDER_FAILED });
  }
}

function* postShiftAlbum({ payload }: any) {
  try {
    const { postInfo, albumId } = payload;
    const postId = postInfo.postId;
    yield call(postShiftAlbumApi, postId, albumId);
    yield put({ type: POST_SHIFT_ALBUM_SUCCEED, payload: { postInfo, albumId } });
  } catch (err: any) {
    yield put({ type: POST_SHIFT_ALBUM_FAILED });
  }
}

function* watchAlbumCreate() {
  yield takeLatest(NEW_ALBUM_REQUEST, createAlbum);
}

function* watchAlbumUpdate() {
  yield takeLatest(UPDATE_ALBUM_REQUEST, updateAlbum);
}

function* watchAlbumDelete() {
  yield takeLatest(DELETE_ALBUM_REQUEST, deleteAlbum);
}

function* watchAlbumOrderUpdate() {
  yield takeLatest(UPDATE_ALBUM_ORDER_REQUEST, updateAlbumOrder);
}

function* watchPostShiftAlbum() {
  yield takeLatest(POST_SHIFT_ALBUM_REQUEST, postShiftAlbum);
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
