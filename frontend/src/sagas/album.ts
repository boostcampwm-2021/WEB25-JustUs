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
} from "@src/reducer/GroupReducer";
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

function* createAlbum({ payload }: any) {
  try {
    const { albumName, groupId } = payload;
    const result: ResponseGenerator = yield call(createAlbumApi, albumName, groupId);
    yield put({ type: NEW_ALBUM_SUCCEED, payload: { albumName, groupId, albumId: result.data.albumId } });
  } catch (err: any) {
    yield put({ type: NEW_ALBUM_FAILED });
  }
}

function* updateAlbum({ payload }: any) {
  try {
    const { albumName, albumId } = payload;
    yield call(updateAlbumApi, albumName, albumId);
    yield put({ type: UPDATE_ALBUM_SUCCEED });
  } catch (err: any) {
    yield put({ type: UPDATE_ALBUM_FAILED });
  }
}

function* deleteAlbum({ payload }: any) {
  try {
    const { albumId } = payload;
    yield call(deleteAlbumApi, albumId);
    yield put({ type: DELETE_ALBUM_SUCCEED });
  } catch (err: any) {
    yield put({ type: DELETE_ALBUM_FAILED });
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

export default function* albumSaga() {
  yield all([fork(watchAlbumCreate), fork(watchAlbumUpdate), fork(watchAlbumDelete)]);
}
