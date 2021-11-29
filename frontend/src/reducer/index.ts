import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModalReducer";
import GroupReducer from "./GroupReducer";
import ModalReducer from "./ModalReducer";
import AddressReducer from "./AddressReducer";
import ThemeReducer from "./ThemeReducer";
import UserReducer from "./UserReducer";
import MapReducer from "./MapReducer";
import ToastReducer from "./ToastReducer";
import SpinnerReducer from "./SpinnerReducer";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  groups: GroupReducer,
  modal: ModalReducer,
  theme: ThemeReducer,
  address: AddressReducer,
  user: UserReducer,
  map: MapReducer,
  toast: ToastReducer,
  spinner: SpinnerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
