import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { GroupAction, SpinnerAction, ToastAction, ModalAction } from "@src/action";
import { modal, toastMessage } from "@src/constants";
import { PostAPI } from "@src/api";
import { refresh } from "./";

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  json: Function;
}
interface FileObject {
  imageUrl: File;
  imageId: string;
}
interface IPost {
  postTitle: string;
  postContent: string;
  postDate: string;
  postLocation: string;
  postLatitude: string;
  postLongitude: string;
  groupId: string;
  postImage: FileObject[];
}

interface IUpdatePost {
  postId: number;
  postTitle: string;
  postContent: string;
  postDate: string;
  postLocation: string;
  postLatitude: string;
  postLongitude: string;
  addImages: FileObject[];
  deleteImagesId: string[];
  groupId: string;
}

function uploadPostApi(newPost: IPost) {
  return PostAPI.uploadPost(newPost);
}

function getPostApi(postId: number) {
  return PostAPI.getPost(postId);
}

function deletePostApi(postId: number) {
  return PostAPI.deletePost(postId);
}

function updatePostApi(newPost: IUpdatePost) {
  return PostAPI.updatePost(newPost);
}

async function getPostsByHashtagApi(hashtagId: number) {
  return PostAPI.getPostsByHashtag(hashtagId);
}

function* uploadPost({ post }: { type: string; post: IPost }) {
  yield put({ type: SpinnerAction.SPINNER_OPEN });
  try {
    const result: ResponseGenerator = yield call(uploadPostApi, post);
    yield put({ type: GroupAction.UPLOAD_POST_SUCCEED, post: { ...post, postId: result.data } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedMakePost },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.UPLOAD_POST_REQUEST, post });
    } else {
      yield put({ type: GroupAction.UPLOAD_POST_FAILED });
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: toastMessage.failedMakePost },
      });
    }
  } finally {
    yield put({ type: SpinnerAction.SPINNER_CLOSE });
  }
}

function* getPost({ postId }: { type: string; postId: number }) {
  yield put({ type: SpinnerAction.SPINNER_OPEN });
  try {
    const result: ResponseGenerator = yield call(getPostApi, postId);
    yield put({ type: ModalAction.SELECT_POST_SUCCEED, post: result.data });
    yield put(ModalAction.openModalAction(modal.PostShowModal));
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: ModalAction.SELECT_POST_REQUEST, postId });
    } else {
      yield put({ type: ModalAction.SELECT_POST_FAILED });
      yield put({ type: SpinnerAction.SPINNER_CLOSE });
    }
  }
}

function* deletePost({ postId }: { type: string; postId: number }) {
  try {
    yield call(deletePostApi, postId);
    yield put({ type: GroupAction.DELETE_POST_SUCCEED, postId: postId });
    yield put({ type: ModalAction.CLOSE_MODAL });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedRemovePost },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.DELETE_POST_REQUEST, postId });
    } else {
      yield put({ type: ModalAction.SELECT_POST_FAILED });
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: toastMessage.failedRemovePost },
      });
    }
  }
}

function* updatePost({ post }: { type: string; post: IUpdatePost }) {
  yield put({ type: SpinnerAction.SPINNER_OPEN });
  try {
    yield call(updatePostApi, post);
    yield put({ type: GroupAction.UPDATE_POST_SUCCEED, post });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedUpdatePost },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.UPDATE_POST_REQUEST, post });
    } else {
      yield put({ type: GroupAction.UPDATE_POST_FAILED });
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: toastMessage.failedUpdatePost },
      });
    }
  } finally {
    yield put({ type: SpinnerAction.SPINNER_CLOSE });
  }
}

function* getPostsByHashtag({ type, payload }: { type: string; payload: { hashtagId: number } }) {
  const { hashtagId } = payload;

  try {
    const result: ResponseGenerator = yield call(getPostsByHashtagApi, hashtagId);
    const { posts } = result.data;
    yield put({ type: GroupAction.SET_SEARCHLIST, payload: { searchList: posts } });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      yield refresh({ type: GroupAction.REQUEST_POSTS_BY_HASHTAG, payload });
    }
  }
}

function* watchUploadPost() {
  yield takeEvery(GroupAction.UPLOAD_POST_REQUEST, uploadPost);
}
function* watchDeletePost() {
  yield takeEvery(GroupAction.DELETE_POST_REQUEST, deletePost);
}
function* watchSelectPost() {
  yield takeEvery(ModalAction.SELECT_POST_REQUEST, getPost);
}
function* watchUpdatePost() {
  yield takeEvery(GroupAction.UPDATE_POST_REQUEST, updatePost);
}
function* watchRequestPostsByHashtag() {
  yield takeEvery(GroupAction.REQUEST_POSTS_BY_HASHTAG, getPostsByHashtag);
}

export default function* userSaga() {
  yield all([
    fork(watchUploadPost),
    fork(watchSelectPost),
    fork(watchUpdatePost),
    fork(watchDeletePost),
    fork(watchRequestPostsByHashtag),
  ]);
}
