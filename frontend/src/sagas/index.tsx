import { all, fork, call, put } from "redux-saga/effects";
import group from "./group";
import user from "./user";
import post from "./post";
import album from "./album";
import { RefreshAPI } from "@src/api";
import { UserAction } from "@src/action";

interface IAction {
  type: string;
  [key: string]: string | number | object;
}

// export function* refresh(action: { type: string; payload?: string | number | object }) {
export function* refresh(action: IAction) {
  try {
    yield call(RefreshAPI);
    yield put(action);
  } catch (err: any) {
    yield put({ type: UserAction.USER_INFO_FAILED });
  }
}

export default function* rootSaga() {
  yield all([fork(group), fork(user), fork(album), fork(post)]);
}
