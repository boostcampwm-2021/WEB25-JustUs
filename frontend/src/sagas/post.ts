import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { GroupAction, SpinnerAction, ToastAction } from "@src/action";
import { modal, toastMessage } from "@src/constants";
import modalAction from "@src/action/ModalAction";
import groupAction from "@src/action/GroupAction";

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
  const { postTitle, postContent, postDate, postLocation, postLatitude, postLongitude, groupId, postImage } = newPost;
  const formData = new FormData();
  formData.append("postTitle", postTitle);
  formData.append("postContent", postContent);
  formData.append("postDate", postDate);
  formData.append("postLocation", postLocation);
  formData.append("postLatitude", postLatitude);
  formData.append("postLongitude", postLongitude);
  formData.append("groupId", groupId);
  postImage.forEach((image) => formData.append("postImages", image.imageUrl));

  return axios({
    method: "post",
    url: `${SERVER_URL}/api/posts`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

function getPostApi(postId: number) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/api/posts/${postId}`,
    withCredentials: true,
  });
}

function deletePostApi(postId: number) {
  return axios({
    method: "delete",
    url: `${SERVER_URL}/api/posts/${postId}`,
    withCredentials: true,
  });
}

function updatePostApi(newPost: IUpdatePost) {
  const {
    postId,
    postTitle,
    postContent,
    postDate,
    postLocation,
    postLatitude,
    postLongitude,
    addImages,
    deleteImagesId,
    groupId,
  } = newPost;

  const formData = new FormData();
  formData.append("postTitle", postTitle);
  formData.append("postContent", postContent);
  formData.append("postDate", postDate);
  formData.append("postLocation", postLocation);
  formData.append("postLatitude", postLatitude);
  formData.append("postLongitude", postLongitude);
  formData.append("groupId", groupId);
  addImages.forEach((image) => formData.append("addImages", image.imageUrl));
  deleteImagesId.forEach((id) => formData.append("deleteImagesId", id));

  return axios({
    method: "put",
    url: `${SERVER_URL}/api/posts/${postId}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

async function getPostsByHashtagApi(hashtagId: number) {
  const result = await axios.get(`${SERVER_URL}/api/posts/search?hashtagId=${hashtagId}`, { withCredentials: true });
  return result;
}

function* uploadPost({ post }: { type: string; post: IPost }) {
  yield put({ type: SpinnerAction.SPINNER_OPEN });
  try {
    const result: ResponseGenerator = yield call(uploadPostApi, post);
    yield put({ type: groupAction.UPLOAD_POST_SUCCEED, post: { ...post, postId: result.data } });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedMakePost },
    });
  } catch (err: unknown) {
    yield put({ type: groupAction.UPLOAD_POST_FAILED });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedMakePost },
    });
  } finally {
    yield put({ type: SpinnerAction.SPINNER_CLOSE });
  }
}

function* getPost({ postId }: { type: string; postId: number }) {
  yield put({ type: SpinnerAction.SPINNER_OPEN });
  try {
    const result: ResponseGenerator = yield call(getPostApi, postId);
    yield put({ type: modalAction.SELECT_POST_SUCCEED, post: result.data });
    yield put(modalAction.openModalAction(modal.PostShowModal));
  } catch (err: unknown) {
    yield put({ type: modalAction.SELECT_POST_FAILED });
    yield put({ type: SpinnerAction.SPINNER_CLOSE });
  }
}

function* deletePost({ postId }: { type: string; postId: number }) {
  try {
    yield call(deletePostApi, postId);
    yield put({ type: groupAction.DELETE_POST_SUCCEED, postId: postId });
    yield put({ type: modalAction.CLOSE_MODAL });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedRemovePost },
    });
  } catch (err: unknown) {
    yield put({ type: modalAction.SELECT_POST_FAILED });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedRemovePost },
    });
  }
}

function* updatePost({ post }: { type: string; post: IUpdatePost }) {
  yield put({ type: SpinnerAction.SPINNER_OPEN });
  try {
    yield call(updatePostApi, post);
    yield put({ type: groupAction.UPDATE_POST_SUCCEED, post });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: toastMessage.succeedUpdatePost },
    });
  } catch (err: unknown) {
    yield put({ type: groupAction.UPDATE_POST_FAILED });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: toastMessage.failedUpdatePost },
    });
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
  } catch (err) {}
}

function* watchUploadPost() {
  yield takeEvery(groupAction.UPLOAD_POST_REQUEST, uploadPost);
}
function* watchDeletePost() {
  yield takeEvery(groupAction.DELETE_POST_REQUEST, deletePost);
}
function* watchSelectPost() {
  yield takeEvery(modalAction.SELECT_POST_REQUEST, getPost);
}
function* watchUpdatePost() {
  yield takeEvery(groupAction.UPDATE_POST_REQUEST, updatePost);
}
function* watchRequestPostsByHashtag() {
  yield takeEvery(groupAction.REQUEST_POSTS_BY_HASHTAG, getPostsByHashtag);
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
