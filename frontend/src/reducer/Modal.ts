interface Imarker {
  postTitle: string;
  postId: number;
}

interface IPost {
  userId: number;
  userNickname: string;
  postId: number;
  postTitle: string;
  postContent: string;
  postDate: string;
  images: Array<{ imageUrl: string; imageId: string }>;
  postLatitude: number;
  postLongitude: number;
  postLocation: string;
}

export const SET_PROFILE_WRAPPER_MODAL_OPENED = "SET_PROFILE_WRAPPER_MODAL_OPENED";
export const SET_ALBUM_SETTING_WRAPPER_MODAL_IDX = "SET_ALBUM_SETTING_WRAPPER_MODAL_IDX";

const initState: {
  nowModal: string;
  nowAddress: string;
  selectedAlbum: { albumId: number; albumName: string };
  selectedPost: IPost;
  clusteredMarker: Imarker[];
  isPostLoading: boolean;
  isProfileWrapperModalOpened: boolean;
  albumSettingWrapperModalIdx: number;
} = {
  nowModal: "",
  nowAddress: "",
  selectedAlbum: {
    albumId: -1,
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
    postLocation: "",
  },
  clusteredMarker: [],
  isPostLoading: false,
  isProfileWrapperModalOpened: false,
  albumSettingWrapperModalIdx: -1,
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
          albumId: action.payload.albumId,
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
    case SET_PROFILE_WRAPPER_MODAL_OPENED: {
      return {
        ...state,
        isProfileWrapperModalOpened: action.payload.isProfileWrapperModalOpened,
      };
    }
    case SET_ALBUM_SETTING_WRAPPER_MODAL_IDX: {
      return {
        ...state,
        albumSettingWrapperModalIdx: action.payload.albumSettingWrapperModalIdx,
      };
    }
  }
};

export default ModalReducer;
