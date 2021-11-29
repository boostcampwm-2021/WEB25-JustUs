import { all, fork, put, call, takeEvery, select } from "redux-saga/effects";
import { GroupAction, ToastAction } from "@src/action";
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
  yield put({ type: "SPINNER_OPEN" });
  try {
    const result: ResponseGenerator = yield call(uploadPostApi, post);
    yield put({ type: "UPLOAD_POST_SUCCEED", post: { ...post, postId: result.data } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: `게시글이 생성되었습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.UPLOAD_POST_REQUEST, payload: { post } });
      }
    }
    yield put({ type: "UPLOAD_POST_FAILED" });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: `게시글 생성에 실패했습니다.` },
    });
  } finally {
    yield put({ type: "SPINNER_CLOSE" });
  }
}

function* getPost({ postId }: { type: string; postId: number }) {
  yield put({ type: "SPINNER_OPEN" });
  try {
    const result: ResponseGenerator = yield call(getPostApi, postId);
    yield put({ type: "SELECT_POST_SUCCEED", post: result.data });
    yield put({ type: "OPEN_MODAL", payload: "PostShowModal" });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction, postId });
      }
    }
    yield put({ type: "SELECT_POST_FAILED" });
    yield put({ type: "SPINNER_CLOSE" });
  }
}

function* deletePost({ postId }: { type: string; postId: number }) {
  try {
    const result: ResponseGenerator = yield call(deletePostApi, postId);
    yield put({ type: "DELETE_POST_SUCCEED", postId: postId });
    yield put({ type: "CLOSE_MODAL" });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: `게시글이 삭제되었습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.DELETE_POST_REQUEST, postId });
      }
    } else {
      yield put({ type: "SELECT_POST_FAILED" });
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: `게시글 삭제에 실패했습니다.` },
      });
    }
  }
}

function* updatePost({ post }: { type: string; post: IUpdatePost }) {
  yield put({ type: "SPINNER_OPEN" });
  try {
    const result: ResponseGenerator = yield call(updatePostApi, post);
    yield put({ type: "UPDATE_POST_SUCCEED", post });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: `게시글이 수정되었습니다.` },
    });
  } catch (err: any) {
    const { status, statusText } = err.response;
    if (status === 401) {
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.UPDATE_POST_REQUEST, post });
      }
    } else {
      yield put({ type: "UPDATE_POST_FAILED" });
      yield put({
        type: ToastAction.SET_ERROR_TOAST,
        payload: { text: `게시글 수정에 실패했습니다.` },
      });
    }
  } finally {
    yield put({ type: "SPINNER_CLOSE" });
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
      if (statusText === "Unauthorized") {
        yield refresh();
        yield put({ type: GroupAction.REQUEST_POSTS_BY_HASHTAG, payload });
      }
    }
  }
}

function* watchUploadPost() {
  yield takeEvery("UPLOAD_POST_REQUEST", uploadPost);
}
function* watchDeletePost() {
  yield takeEvery("DELETE_POST_REQUEST", deletePost);
}
function* watchSelectPost() {
  yield takeEvery("SELECT_POST_REQUEST", getPost);
}
function* watchUpdatePost() {
  yield takeEvery("UPDATE_POST_REQUEST", updatePost);
}
function* watchRequestPostsByHashtag() {
  yield takeEvery("REQUEST_POSTS_BY_HASHTAG", getPostsByHashtag);
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
