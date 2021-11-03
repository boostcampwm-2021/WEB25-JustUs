import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModal";
import ProfileModalReducer from "./ProfileModal";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  profileModal: ProfileModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
