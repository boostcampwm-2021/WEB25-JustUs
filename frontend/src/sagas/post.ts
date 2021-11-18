import { all, fork, put, call, takeEvery, select } from "redux-saga/effects";
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

function* uploadPost({ post }: { type: string; post: IPost }) {
  try {
    const result: ResponseGenerator = yield call(uploadPostApi, post);
    yield put({ type: "UPLOAD_POST_SUCCEED", post: { ...post, postID: result.data } });
  } catch (err: unknown) {
    yield put({ type: "UPLOAD_POST_FAILED" });
  }
}

function* watchUploadPost() {
  yield takeEvery("UPLOAD_POST_REQUEST", uploadPost);
}

function getPostApi(postId: number) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/api/posts/${postId}`,
    withCredentials: true,
  });
}

function* getPost({ postId }: { type: string; postId: number }) {
  try {
    const result: ResponseGenerator = yield call(getPostApi, postId);
    yield put({ type: "SELECT_POST_SUCCEED", post: result.data });
    yield put({ type: "OPEN_MODAL", payload: "PostShowModal" });
  } catch (err: unknown) {
    yield put({ type: "SELECT_POST_FAILED" });
  }
}

function* watchSelectPost() {
  yield takeEvery("SELECT_POST_REQUEST", getPost);
}

export default function* userSaga() {
  yield all([fork(watchUploadPost), fork(watchSelectPost)]);
}
