const initState = {
  clickedTarget: { element: document.body },
  addJoinMOdalOpened: false,
  createGroupModalOpened: false,
  joinGroupModalOpened: false,
};

const groupModalReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_CLICKED_TARGET":
      return {
        ...state,
        clickedTarget: { element: action.payload },
      };
    case "OPEN_CREATE_GROUP_MODAL":
      return {
        ...state,
        createGroupModalOpened: true,
      };
    case "CLOSE_CREATE_GROUP_MODAL":
      return {
        ...state,
        createGroupModalOpened: false,
      };
    case "OPEN_JOIN_GROUP_MODAL":
      return {
        ...state,
        joinGroupModalOpened: true,
      };
    case "CLOSE_JOIN_GROUP_MODAL":
      return {
        ...state,
        joinGroupModalOpened: false,
      };

    default:
      return state;
  }
};

export default groupModalReducer;
