const initState: { spinnerActivate: boolean } = {
  spinnerActivate: false,
};
const SpinnerReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SPINNER_OPEN":
      return {
        ...state,
        spinnerActivate: true,
      };
    case "SPINNER_CLOSE":
      return {
        ...state,
        spinnerActivate: false,
      };

    default:
      return state;
  }
};

export default SpinnerReducer;
