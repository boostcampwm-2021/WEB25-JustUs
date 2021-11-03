import { GroupModalAction } from "@src/action";

const initState = {
  clickedTarget: { element: document.body },
  addJoinMOdalOpened: false,
  createGroupModalOpened: false,
  joinGroupModalOpened: false,
  settingGroupModalOpened: false,
};

const groupModalReducer = (state = initState, action: any) => {
  switch (action.type) {
    case GroupModalAction.SET_CLICKED_TARGET:
      return {
        ...state,
        clickedTarget: { element: action.payload },
      };
    case GroupModalAction.OPEN_CREATE_GROUP_MODAL:
      return {
        ...state,
        createGroupModalOpened: true,
      };
    case GroupModalAction.CLOSE_CREATE_GROUP_MODAL:
      return {
        ...state,
        createGroupModalOpened: false,
      };
    case GroupModalAction.OPEN_JOIN_GROUP_MODAL:
      return {
        ...state,
        joinGroupModalOpened: true,
      };
    case GroupModalAction.CLOSE_JOIN_GROUP_MODAL:
      return {
        ...state,
        joinGroupModalOpened: false,
      };
    case GroupModalAction.OPEN_SETTING_GROUP_MODAL:
      return {
        ...state,
        settingGroupModalOpened: true,
      };
    case GroupModalAction.CLOSE_SETTING_GROUP_MODAL:
      return {
        ...state,
        settingGroupModalOpened: false,
      };

    default:
      return state;
  }
};

export default groupModalReducer;
