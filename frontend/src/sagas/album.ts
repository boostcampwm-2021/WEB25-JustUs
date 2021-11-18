import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { NEW_ALBUM_REQUEST, NEW_ALBUM_SUCCEED, NEW_ALBUM_FAILED } from "@src/reducer/AlbumReducer";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function createAlbumApi(albumName: string, groupId: number) {
  return axios.post(`${SERVER_URL}/api/albums`, { albumName, groupId }, { withCredentials: true });
}

function* createAlbum({ payload }: any) {
  try {
    const { albumName, groupId } = payload;
    yield call(createAlbumApi, albumName, groupId);
    yield put({ type: NEW_ALBUM_SUCCEED });
  } catch (err: any) {
    yield put({ type: NEW_ALBUM_FAILED });
  }
}

function* watchAlbumCreate() {
  yield takeLatest(NEW_ALBUM_REQUEST, createAlbum);
}

export default function* albumSaga() {
  yield all([fork(watchAlbumCreate)]);
}
