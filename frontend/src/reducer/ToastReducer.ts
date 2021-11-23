const initState = {
  text: "",
  isSucceed: false,
  isError: false,
};

export const SET_SUCCEED_TOAST = "SET_SUCCEED_TOAST";
export const SET_ERROR_TOAST = "SET_ERROR_TOAST";
export const CLEAR_TOAST = "CLEAR_TOAST";

const toastReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_SUCCEED_TOAST: {
      return {
        ...state,
        text: action.payload.text,
        isSucceed: true,
        isError: false,
      };
    }
    case SET_ERROR_TOAST: {
      return {
        ...state,
        text: action.payload.text,
        isSucceed: false,
        isError: true,
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
