const initState: { nowModal: string } = {
  nowModal: "",
};

const UploadModalReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        nowModal: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        nowModal: "",
      };

    default:
      return state;
  }
};

export default UploadModalReducer;
