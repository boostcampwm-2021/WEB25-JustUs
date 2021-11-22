import { combineReducers } from "redux";
import GroupModalReducer from "./GroupModalReducer";
import groupReducer from "./GroupReducer";
import ModalReducer from "./Modal";
import AddressReducer from "./AddressReducer";
import Theme from "./Theme";
import UserReducer from "./UserReducer";
import MapReducer from "./MapReducer";

const rootReducer = combineReducers({
  groupModal: GroupModalReducer,
  groups: groupReducer,
  modal: ModalReducer,
  theme: Theme,
  address: AddressReducer,
  user: UserReducer,
  map: MapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
