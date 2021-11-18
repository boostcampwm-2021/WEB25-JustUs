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
  file: File | string;
  key: string;
}
interface IPost {
  postTitle: string;
  postContent: string;
  postDate: string;
  postLocation: string;
  postLatitude: string;
  postLongitude: string;
  albumId: string;
  postImage: FileObject[];
}

function uploadPostApi(uploadPost: IPost) {
  const { postTitle, postContent, postDate, postLocation, postLatitude, postLongitude, albumId, postImage } =
    uploadPost;
  const formData = new FormData();
  formData.append("postTitle", postTitle);
  formData.append("postContent", postContent);
  formData.append("postDate", postDate);
  formData.append("postLocation", postLocation);
  formData.append("postLatitude", postLatitude);
  formData.append("postLongitude", postLongitude);
  formData.append("albumId", albumId);
  postImage.forEach((image) => formData.append("postImage", image.file));

  return axios({
    method: "post",
    url: `${SERVER_URL}/api/posts`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

function* postUpload({ post }: { type: string; post: IPost }) {
  try {
    const result: ResponseGenerator = yield call(uploadPostApi, post);
    yield put({ type: "UPLOAD_POST_SUCCEED", post: { ...post, postID: result.data } });
  } catch (err: unknown) {
    yield put({ type: "UPLOAD_POST_FAILED" });
  }
}

function* watchUploadPost() {
  yield takeEvery("UPLOAD_POST_REQUEST", postUpload);
}

export default function* userSaga() {
  yield all([fork(watchUploadPost)]);
}
