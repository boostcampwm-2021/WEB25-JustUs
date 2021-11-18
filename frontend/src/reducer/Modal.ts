interface Imarker {
  postTitle: string;
  postId: number;
}
const initState: {
  nowModal: string;
  nowAddress: string;
  selectedAlbum: { albumID: number; albumName: string };
  selectedPost: {
    userId: number;
    userNickname: string;
    postId: number;
    postTitle: string;
    postContent: string;
    postDate: string;
    images: Array<{ imageUrl: string; imageId: string }>;
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
    userId: -1,
    userNickname: "",
    postId: -1,
    postTitle: "",
    postContent: "",
    postDate: "",
    images: [],
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
