import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModalReducer";
import groupReducer from "./GroupReducer";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  groups: groupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
