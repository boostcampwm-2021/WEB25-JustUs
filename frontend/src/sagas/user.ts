import { all, fork, put, call, takeEvery, select, delay } from "redux-saga/effects";
import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCEED,
  USER_INFO_FAILED,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCEED,
  LOG_OUT_FAILED,
  USER_INFO_UPDATE,
  SET_UPDATED_USER_INFO,
  SET_UPDATE_FAIL,
  REQUEST_UPDATE_GROUP_ORDER,
} from "@src/reducer/UserReducer";
import axios from "axios";
import { GET_GROUP_LIST, SET_GROUPS } from "@src/reducer/GroupReducer";
import { SET_SUCCEED_TOAST, SET_ERROR_TOAST } from "@src/reducer/ToastReducer";

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
interface IUser {
  userNickName: string;
  userProfile: string;
  userInfoLoading: boolean;
  userInfoSucceed: boolean;
  userInfoError: boolean;
  updateUserNickName: string;
  updateUserProfile: string;
}
function getUserInfoApi() {
  return axios.get(`${SERVER_URL}/api/user`, { withCredentials: true });
}

function getLogOutApi() {
  return axios.post(`${SERVER_URL}/api/auth/logout`, {}, { withCredentials: true });
}

async function updateUserInfoApi(user: IUser) {
  const formData = new FormData();
  const res = await fetch("http://localhost:3000/img/person.png");
  const blob = await res.blob();
  const baseImage = new File([blob], "base-person-image", { type: "image/png" });

  formData.append("userNickname", user.updateUserNickName);
  formData.append("profileImage", user.updateUserProfile ? user.updateUserProfile : baseImage);

  const result = await axios.put(`${SERVER_URL}/api/user`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return result;
}

export async function getGroupListApi() {
  const result = await axios.get(`${SERVER_URL}/api/user/groups`, { withCredentials: true });
  return result;
}

async function updateGroupOrderApi(payload: any) {
  const { groupOrder } = payload;
  const result = axios.put(`${SERVER_URL}/api/user/grouporder`, { groupOrder }, { withCredentials: true });
  return result;
}

function* getUserInfo() {
  try {
    const result: ResponseGenerator = yield call(getUserInfoApi);
    yield put({ type: USER_INFO_SUCCEED, data: result.data });
  } catch (err: any) {
    yield put({ type: USER_INFO_FAILED });
  }
}

function* getLogOut() {
  try {
    yield call(getLogOutApi);
    yield put({ type: LOG_OUT_SUCCEED });
  } catch (err: any) {
    yield put({ type: LOG_OUT_FAILED });
  }
}

function* updateUserInfo() {
  const user: IUser = yield select((state) => state.user);

  try {
    const result: ResponseGenerator = yield call(updateUserInfoApi, user);

    yield put({
      type: SET_UPDATED_USER_INFO,
      payload: { userNickName: user.updateUserNickName, userProfile: result.data.profileImage },
    });
    yield put({
      type: SET_SUCCEED_TOAST,
      payload: { text: `회원 정보가 수정되었습니다.`, isSucceed: true, isError: false },
    });
  } catch (err: any) {
    yield put({ type: SET_UPDATE_FAIL });
    yield put({
      type: SET_ERROR_TOAST,
      payload: { text: `회원 정보 수정에 실패했습니다.`, isSucceed: false, isError: true },
    });
  }
}

function* getGroupList() {
  const result: ResponseGenerator = yield call(getGroupListApi);
  const { groups } = result.data;
  yield put({ type: SET_GROUPS, payload: groups });
}

function* updateGroupOrder(action: any) {
  const groupOrder = action.payload.groupOrder.join(",");

  yield call(updateGroupOrderApi, { groupOrder });
}

function* watchUserInfo() {
  yield takeEvery(USER_INFO_REQUEST, getUserInfo);
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, getLogOut);
}

function* watchUpdateUserInfo() {
  yield takeEvery(USER_INFO_UPDATE, updateUserInfo);
}

function* watchGetGroupList() {
  yield takeEvery(GET_GROUP_LIST, getGroupList);
}

function* watchUpdateGroupOrder() {
  yield takeEvery(REQUEST_UPDATE_GROUP_ORDER, updateGroupOrder);
}

export default function* userSaga() {
  yield all([
    fork(watchUserInfo),
    fork(watchLogOut),
    fork(watchUpdateUserInfo),
    fork(watchGetGroupList),
    fork(watchUpdateGroupOrder),
  ]);
}
