const initState = {
  clickedTarget: { element: document.body },
  addJoinMOdalOpened: false,
};

const groupModalReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_CLICKED_TARGET":
      return {
        ...state,
        clickedTarget: { element: action.payload },
      };
    case "ADD_JOIN_MODAL_OPEN":
      return {
        ...state,
        addJoinMOdalOpened: true,
      };
    case "ADD_JOIN_MODAL_CLOSE":
      return {
        ...state,
        addJoinMOdalOpened: false,
      };
    default:
      return state;
  }
};

export default groupModalReducer;
