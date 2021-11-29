import { all, fork, put, call, takeEvery, select } from "redux-saga/effects";
import { customAxios } from "@src/lib/customAxios";
import { UserAction, GroupAction, ToastAction } from "@src/action";

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
  return customAxios.get(`/api/user`);
}

function getLogOutApi() {
  return customAxios.post(`/api/auth/logout`, {});
}

async function updateUserInfoApi(user: IUser) {
  const formData = new FormData();

  formData.append("userNickname", user.updateUserNickName);
  if (user.updateUserProfile) {
    formData.append("profileImage", user.updateUserProfile);
  }

  const result = await customAxios.put(`/api/user`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return result;
}

export async function getGroupListApi() {
  const result = await customAxios.get(`/api/user/groups`);
  return result;
}

async function updateGroupOrderApi(payload: any) {
  const { groupOrder } = payload;
  const result = customAxios.put(`/api/user/grouporder`, { groupOrder });
  return result;
}

function* getUserInfo() {
  try {
    const result: ResponseGenerator = yield call(getUserInfoApi);
    yield put({ type: UserAction.USER_INFO_SUCCEED, data: result.data });
  } catch (err: any) {
    yield put({ type: UserAction.USER_INFO_FAILED });
  }
}

function* getLogOut() {
  try {
    yield call(getLogOutApi);
    yield put({ type: UserAction.LOG_OUT_SUCCEED });
  } catch (err: any) {
    yield put({ type: UserAction.LOG_OUT_FAILED });
  }
}

function* updateUserInfo() {
  const user: IUser = yield select((state) => state.user);

  try {
    const result: ResponseGenerator = yield call(updateUserInfoApi, user);

    yield put({
      type: UserAction.SET_UPDATED_USER_INFO,
      payload: { userNickName: user.updateUserNickName, userProfile: result.data.profileImage },
    });
    yield put({
      type: ToastAction.SET_SUCCEED_TOAST,
      payload: { text: `회원 정보가 수정되었습니다.` },
    });
  } catch (err: any) {
    yield put({ type: UserAction.SET_UPDATE_FAIL });
    yield put({
      type: ToastAction.SET_ERROR_TOAST,
      payload: { text: `회원 정보 수정에 실패했습니다.` },
    });
  }
}

function* getGroupList() {
  yield put({ type: "SPINNER_OPEN" });
  try {
    const result: ResponseGenerator = yield call(getGroupListApi);
    const { groups } = result.data;
    yield put({ type: GroupAction.GET_GROUP_LIST_SUCCEED, payload: groups });
  } catch {
    yield put({ type: GroupAction.GET_GROUP_LIST_FAILED });
  } finally {
    yield put({ type: "SPINNER_CLOSE" });
  }
}

function* updateGroupOrder(action: any) {
  const groupOrder = action.payload.groupOrder.join(",");

  yield call(updateGroupOrderApi, { groupOrder });
}

function* watchUserInfo() {
  yield takeEvery(UserAction.USER_INFO_REQUEST, getUserInfo);
}

function* watchLogOut() {
  yield takeEvery(UserAction.LOG_OUT_REQUEST, getLogOut);
}

function* watchUpdateUserInfo() {
  yield takeEvery(UserAction.USER_INFO_UPDATE, updateUserInfo);
}

function* watchGetGroupList() {
  yield takeEvery(GroupAction.GET_GROUP_LIST_REQUEST, getGroupList);
}

function* watchUpdateGroupOrder() {
  yield takeEvery(UserAction.REQUEST_UPDATE_GROUP_ORDER, updateGroupOrder);
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
