const toastAction = {
  SET_SUCCEED_TOAST: "SET_SUCCEED_TOAST",
  SET_ERROR_TOAST: "SET_ERROR_TOAST",
  CLEAR_TOAST: "CLEAR_TOAST",

  clearToastAction: () => {
    return { type: toastAction.CLEAR_TOAST };
  },

  setSucceedToastAction: (payload: { text: string }) => {
    return { type: toastAction.SET_SUCCEED_TOAST, payload };
  },

  setErrorToastAction: (payload: { text: string }) => {
    return { type: toastAction.SET_ERROR_TOAST, payload };
  },
};

export default toastAction;
