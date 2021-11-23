const initState = {
  text: "",
  isSucceed: false,
  isError: false,
};

export const SET_SUCCEED_TOAST = "SET_SUCCEED_TOAST";
export const CLEAR_TOAST = "CLEAR_TOAST";

const toastReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_SUCCEED_TOAST: {
      return {
        ...state,
        text: action.payload.text,
        isSucceed: action.payload.isSucceed,
        isError: action.payload.isError,
      };
    }
    case CLEAR_TOAST: {
      return {
        ...state,
        text: "",
        isSucceed: false,
        isError: false,
      };
    }
    default:
      return state;
  }
};

export default toastReducer;
