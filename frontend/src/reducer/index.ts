import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModal";
import UploadModalReducer from "./UploadModal";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  uploadModal: UploadModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
