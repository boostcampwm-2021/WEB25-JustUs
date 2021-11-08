import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModalReducer";
import groupReducer from "./GroupReducer";
import ModalReducer from "./Modal";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  groups: groupReducer,
  modal: ModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
