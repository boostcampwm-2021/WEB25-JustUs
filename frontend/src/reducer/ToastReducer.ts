import { ToastAction } from "@src/action";

const initState = {
  text: "",
  isSucceed: false,
  isError: false,
};

const toastReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ToastAction.SET_SUCCEED_TOAST: {
      return {
        ...state,
        text: action.payload.text,
        isSucceed: true,
        isError: false,
      };
    }
    case ToastAction.SET_ERROR_TOAST: {
      return {
        ...state,
        text: action.payload.text,
        isSucceed: false,
        isError: true,
      };
    }
    case ToastAction.CLEAR_TOAST: {
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
