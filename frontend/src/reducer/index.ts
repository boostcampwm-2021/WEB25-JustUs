import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModalReducer";
import groupReducer from "./GroupReducer";
import UploadModalReducer from "./UploadModal";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  groups: groupReducer,
  uploadModal: UploadModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
