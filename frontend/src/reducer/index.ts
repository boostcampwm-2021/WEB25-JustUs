import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModal";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
