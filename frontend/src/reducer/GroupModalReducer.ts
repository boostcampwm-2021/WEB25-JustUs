import { GroupModalAction } from "@src/action";

const initState = {
  clickedTarget: { target: document.body, clientX: 0, clientY: 0 },
};

const groupModalReducer = (state = initState, action: any) => {
  switch (action.type) {
    case GroupModalAction.SET_CLICKED_TARGET:
      return {
        ...state,
        clickedTarget: {
          target: action.payload.target,
          clientX: action.payload.clientX,
          clientY: action.payload.clientY,
        },
      };

    default:
      return state;
  }
};

export default groupModalReducer;
