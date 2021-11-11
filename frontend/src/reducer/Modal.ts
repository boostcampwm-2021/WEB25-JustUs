const initState: {
  nowModal: string;
  selectedAlbum: { albumID: number; albumName: string };
  selectedPost: {
    postID: number;
    postTitle: string;
    postContent: string;
    postDate: string;
    userNickname: string;
    postImages: Array<{ file: string; key: string }>;
  };
} = {
  nowModal: "",
  selectedAlbum: {
    albumID: -1,
    albumName: "",
  },
  selectedPost: {
    postID: -1,
    postTitle: "",
    postContent: "",
    postDate: "",
    userNickname: "",
    postImages: [],
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
    case "SET_SELECTED_POST":
      return {
        ...state,
        selectedPost: {
          postID: action.payload.postID,
          postTitle: action.payload.postTitle,
          postContent: action.payload.postContent,
          postDate: action.payload.postDate,
          userNickname: action.payload.userNickname,
          postImages: action.payload.postImages,
          postLatitude: action.payload.postLatitude,
          postLongitude: action.payload.postLongitude,
        },
      };
    default:
      return state;
  }
};

export default ModalReducer;
