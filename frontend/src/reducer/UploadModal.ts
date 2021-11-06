const initState: { nowModal: string; selectedAlbumName: string } = {
  nowModal: "",
  selectedAlbumName: "",
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
    case "SET_ALBUM_NAME":
      return {
        ...state,
        selectedAlbumName: action.payload,
      };

    default:
      return state;
  }
};

export default UploadModalReducer;
