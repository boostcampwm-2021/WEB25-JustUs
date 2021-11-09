const initState: { nowModal: string; selectedAlbum: { albumID: number; albumName: string } } = {
  nowModal: "",
  selectedAlbum: {
    albumID: -1,
    albumName: "",
  },
};

const ModalReducer = (state = initState, action: any) => {
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
    case "SET_SELECTED_ALBUM":
      return {
        ...state,
        selectedAlbum: {
          albumID: action.payload.albumID,
          albumName: action.payload.albumName,
        },
      };

    default:
      return state;
  }
};

export default ModalReducer;
