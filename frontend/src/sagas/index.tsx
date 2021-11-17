import { all, call, fork } from "redux-saga/effects";
import group from "./group";
import user from "./user";

export default function* rootSaga() {
  yield all([fork(group), fork(user)]);
}
