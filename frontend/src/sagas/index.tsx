import { all, fork } from "redux-saga/effects";
import group from "./group";
import user from "./user";
import album from "./album";

export default function* rootSaga() {
  yield all([fork(group), fork(user), fork(album)]);
}
