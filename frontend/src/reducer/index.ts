import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModalReducer";
import groupReducer from "./GroupReducer";
import ModalReducer from "./Modal";
import Theme from "./Theme";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  groups: groupReducer,
  modal: ModalReducer,
  theme: Theme,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
