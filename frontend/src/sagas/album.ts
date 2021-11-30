import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { GroupAction, ToastAction } from "@src/action";
import { AlbumAPI } from "@src/api";
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

function createAlbumApi(albumName: string, groupId: number) {
  return AlbumAPI.createAlbum(albumName, groupId);
}

function updateAlbumApi(albumName: string, albumId: number) {
  return AlbumAPI.updateAlbum(albumName, albumId);
}

function deleteAlbumApi(albumId: number) {
  return AlbumAPI.deleteAlbum(albumId);
}

function updateAlbumOrderApi(groupId: number, albumOrder: string) {
  return AlbumAPI.updateAlbumOrder(groupId, albumOrder);
}

function postShiftAlbumApi(postId: number, albumId: number) {
  return AlbumAPI.postShiftAlbum(postId, albumId);
}

function* createAlbum({ payload }: any) {
  try {
    const { albumName, groupId } = payload;
    const result: ResponseGenerator = yield call(createAlbumApi, albumName, groupId);
    yield put({ type: GroupAction.NEW_ALBUM_SUCCEED, payload: { albumName, groupId, albumId: result.data.albumId } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: `${albumName} 앨범이 생성되었습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.NEW_ALBUM_REQUEST, payload });
    }
  }
}

function* updateAlbum({ payload }: any) {
  try {
    const { albumName, albumId } = payload;
    yield call(updateAlbumApi, albumName, albumId);
    yield put({ type: GroupAction.UPDATE_ALBUM_SUCCEED, payload: { albumName, albumId } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: `앨범 정보가 수정되었습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.UPDATE_ALBUM_REQUEST, payload });
    } else {
      yield put({ type: GroupAction.UPDATE_ALBUM_FAILED });
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: `앨범 수정에 실패했습니다.` },
      });
    }
  }
}

function* deleteAlbum({ payload }: any) {
  try {
    const { albumId } = payload;
    yield call(deleteAlbumApi, albumId);
    yield put({ type: GroupAction.DELETE_ALBUM_SUCCEED, payload: { albumId } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: `앨범이 삭제되었습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.DELETE_ALBUM_REQUEST, payload });
    } else {
      yield put({ type: GroupAction.DELETE_ALBUM_FAILED });
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: `앨범 삭제에 실패했습니다.` },
      });
    }
  }
}

function* updateAlbumOrder({ payload }: any) {
  try {
    const { groupId, albumOrder } = payload;
    yield call(updateAlbumOrderApi, groupId, albumOrder);
    yield put({ type: GroupAction.UPDATE_ALBUM_ORDER_SUCCEED, payload: { groupId, albumOrder } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.UPDATE_ALBUM_ORDER_REQUEST, payload });
    } else {
      yield put({ type: GroupAction.UPDATE_ALBUM_ORDER_FAILED });
    }
  }
}

function* postShiftAlbum({ payload }: any) {
  try {
    const { postInfo, albumId } = payload;
    const postId = postInfo.postId;
    yield call(postShiftAlbumApi, postId, albumId);
    yield put({ type: GroupAction.POST_SHIFT_ALBUM_SUCCEED, payload: { postInfo, albumId } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.POST_SHIFT_ALBUM_REQUEST, payload });
    } else {
      yield put({ type: GroupAction.POST_SHIFT_ALBUM_FAILED });
    }
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
