import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModalReducer";
import groupReducer from "./GroupReducer";
import UploadModalReducer from "./UploadModal";
import ProfileModalReducer from "./ProfileModal";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  groups: groupReducer,
  uploadModal: UploadModalReducer,
  profileModal: ProfileModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
