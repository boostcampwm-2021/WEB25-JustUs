import { all, call } from "redux-saga/effects";
import group from "./group";

export default function* rootSaga() {
  yield all([call(group)]);
}
