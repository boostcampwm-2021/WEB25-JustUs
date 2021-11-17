interface Imarker {
  postTitle: string;
  postId: number;
}
const initState: {
  nowModal: string;
  nowAddress: string;
  selectedAlbum: { albumID: number; albumName: string };
  selectedPost: {
    userID: number;
    userNickname: string;
    postID: number;
    postTitle: string;
    postContent: string;
    postDate: string;
    postImages: Array<{ file: string; key: string }>;
    postLatitude: number;
    postLongitude: number;
  };
  clusteredMarker: Imarker[];
  isPostLoading: boolean;
} = {
  nowModal: "",
  nowAddress: "",
  selectedAlbum: {
    albumID: -1,
    albumName: "",
  },
  selectedPost: {
    userID: -1,
    userNickname: "",
    postID: -1,
    postTitle: "",
    postContent: "",
    postDate: "",
    postImages: [],
    postLatitude: -1,
    postLongitude: -1,
  },
  clusteredMarker: [],
  isPostLoading: false,
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
    case "SELECT_POST_REQUEST":
      return { ...state, isPostLoading: true };
    case "SELECT_POST_SUCCEED":
      return {
        ...state,
        selectedPost: action.post,
        isPostLoading: false,
      };
    case "SELECT_POST_FAILED":
      return { ...state, isPostLoading: false };
    case "SET_SELECTED_POST":
      return {
        ...state,
        selectedPost: {
          userID: -1,
          userNickname: action.payload.userNickname,
          postID: action.payload.postID,
          postTitle: action.payload.postTitle,
          postContent: action.payload.postContent,
          postDate: action.payload.postDate,
          postImages: action.payload.postImages,
          postLatitude: action.payload.postLatitude,
          postLongitude: action.payload.postLongitude,
        },
      };
    case "SET_CLUSTERED_MARKER":
      return {
        ...state,
        clusteredMarker: action.payload,
      };
    default:
      return state;
  }
};

export default ModalReducer;
