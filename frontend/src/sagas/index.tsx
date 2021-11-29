import { all, fork, call } from "redux-saga/effects";
import group from "./group";
import user from "./user";
import post from "./post";
import album from "./album";
import { RefreshAPI } from "@src/api";

export function* refresh() {
  try {
    yield call(RefreshAPI);
  } catch (err: any) {}
}

export default function* rootSaga() {
  yield all([fork(group), fork(user), fork(album), fork(post)]);
}
