const spinnerAction = {
  SPINNER_OPEN: "SPINNER_OPEN",
  SPINNER_CLOSE: "SPINNER_CLOSE",

  setSpinnerOpenAction: () => {
    return { type: spinnerAction.SPINNER_OPEN };
  },

  setSpinnerCloseAction: () => {
    return { type: spinnerAction.SPINNER_CLOSE };
  },
};

export default spinnerAction;
