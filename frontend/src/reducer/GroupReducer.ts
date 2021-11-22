import { GroupAction } from "@src/action";

interface GroupType {
  groupId: number;
  groupName: string;
  groupImg: string;
}
interface PostType {
  postId: number;
  postTitle: string;
  postLatitude: number;
  postLongitude: number;
}
interface AlbumListItemType {
  albumId: number;
  albumName: string;
  posts: PostType[];
  base: boolean;
}

interface IInitState {
  selectedGroup: GroupType | null;
  isLoading: Boolean;
  albumList: AlbumListItemType[];
  postsList: PostType[];
  isPostUploading: boolean;
  isPostUpdateing: boolean;
  isPostDeleting: boolean;
  groups: Array<GroupType>;
  newAlbumLoading: boolean;
  newAlbumSucceed: boolean;
  newAlbumError: boolean;
  updateAlbumLoading: boolean;
  updateAlbumSucceed: boolean;
  updateAlbumError: boolean;
  deleteAlbumLoading: boolean;
  deleteAlbumSucceed: boolean;
  deleteAlbumError: boolean;
  postShiftAlbumLoading: boolean;
  postShiftAlbumSucceed: boolean;
  postShiftAlbumError: boolean;
}

const initState: IInitState = {
  selectedGroup: null,
  isLoading: true,
  groups: [],
  albumList: [{ albumId: 0, albumName: "", posts: [], base: false }],
  isPostUploading: false,
  isPostUpdateing: false,
  isPostDeleting: false,
  postsList: [{ postId: -1, postTitle: "", postLatitude: 0, postLongitude: 0 }],
  newAlbumLoading: false,
  newAlbumSucceed: false,
  newAlbumError: false,
  updateAlbumLoading: false,
  updateAlbumSucceed: false,
  updateAlbumError: false,
  deleteAlbumLoading: false,
  deleteAlbumSucceed: false,
  deleteAlbumError: false,
  postShiftAlbumLoading: false,
  postShiftAlbumSucceed: false,
  postShiftAlbumError: false,
};

export const CREATE_GROUP = "CREATE_GROUP";
export const GET_ALBUM_LIST = "GET_ALBUM_LIST";
export const REQUEST_DELETE = "REQUEST_DELETE";
export const DELETE_GROUP = "DELETE_GROUP";
export const GET_GROUP_MEMBER_LIST = "GET_GROUP_MEMBER_LIST";
export const GET_GROUP_LIST = "GET_GROUP_LIST";
export const SET_GROUPS = "SET_GROUPS";
export const REQUEST_JOIN_GROUP = "REQUEST_JOIN_GROUP";
export const REQUEST_UPDATE_GROUP = "REQUEST_UPDATE_GROUP";

export const NEW_ALBUM_REQUEST = "NEW_ALBUM_REQUEST";
export const NEW_ALBUM_SUCCEED = "NEW_ALBUM_SUCCEED";
export const NEW_ALBUM_FAILED = "NEW_ALBUM_FAILED";
export const UPDATE_ALBUM_REQUEST = "UPDATE_ALBUM_REQUEST";
export const UPDATE_ALBUM_SUCCEED = "UPDATE_ALBUM_SUCCEED";
export const UPDATE_ALBUM_FAILED = "UPDATE_ALBUM_FAILED";
export const DELETE_ALBUM_REQUEST = "DELETE_ALBUM_REQUEST";
export const DELETE_ALBUM_SUCCEED = "DELETE_ALBUM_SUCCEED";
export const DELETE_ALBUM_FAILED = "DELETE_ALBUM_FAILED";
export const UPDATE_ALBUM_ORDER_REQUEST = "UPDATE_ALBUM_ORDER_REQUEST";
export const UPDATE_ALBUM_ORDER_SUCCEED = "UPDATE_ALBUM_ORDER_SUCCEED";
export const UPDATE_ALBUM_ORDER_FAILED = "UPDATE_ALBUM_ORDER_FAILED";
export const POST_SHIFT_ALBUM_REQUEST = "POST_SHIFT_ALBUM_REQUEST";
export const POST_SHIFT_ALBUM_SUCCEED = "POST_SHIFT_ALBUM_SUCCEED";
export const POST_SHIFT_ALBUM_FAILED = "POST_SHIFT_ALBUM_FAILED";

export const createGroupAction = (payload: any) => ({
  type: CREATE_GROUP,
  payload,
});

export const getAlbumListAction = (payload: any) => ({
  type: GET_ALBUM_LIST,
  payload,
});

export const deleteGroupAction = (payload: any) => ({
  type: REQUEST_DELETE,
  payload,
});

export const getGroupMemberListAction = (payload: any) => ({
  type: GET_GROUP_MEMBER_LIST,
  payload,
});

export const getGroupListAction = () => ({
  type: GET_GROUP_LIST,
});

export const requestJoinGroupAction = (payload: any) => ({
  type: REQUEST_JOIN_GROUP,
  payload,
});

export const newAlbumRequestAction = (albumName: string, groupId: number) => ({
  type: NEW_ALBUM_REQUEST,
  payload: {
    albumName,
    groupId,
  },
});

export const updateAlbumRequestAction = (albumName: string, albumId: number) => {
  return {
    type: UPDATE_ALBUM_REQUEST,
    payload: {
      albumName,
      albumId,
    },
  };
};

export const deleteAlbumRequestAction = (albumId: number) => {
  return {
    type: DELETE_ALBUM_REQUEST,
    payload: {
      albumId,
    },
  };
};

export const updateAlbumOrderAction = (groupId: number, albumOrder: string) => {
  return {
    type: UPDATE_ALBUM_ORDER_REQUEST,
    payload: {
      groupId,
      albumOrder,
    },
  };
};

export const postShiftAlbumAction = (
  postInfo: { postId: number; postTitle: string; albumId: number },
  albumId: number,
) => {
  return {
    type: POST_SHIFT_ALBUM_REQUEST,
    payload: {
      postInfo,
      albumId,
    },
  };
};

export const updateGroupAction = (payload: any) => ({
  type: REQUEST_UPDATE_GROUP,
  payload,
});

const groupReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "REQUEST_GROUP_INFO":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS_GROUP_INFO":
      return {
        ...state,
        isLoading: false,
      };
    case "FAILURE_GROUP_INFO":
      return {
        ...state,
        isLoading: false,
        // error 상태도 넣어줘야함.
      };
    case GroupAction.ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case GroupAction.SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: action.payload
          ? {
              groupId: action.payload.groupId,
              groupName: action.payload.groupName,
              groupImage: action.payload.groupImage,
            }
          : null,
        albumList: action.payload ? action.payload.albumList : null,
        postsList: action.payload
          ? action.payload.albumList.map((album: AlbumListItemType) => [...album.posts]).flat()
          : [],
      };
    case GroupAction.DELETE_GROUP:
      return {
        ...state,
        selectedGroup: null,
        groups: state.groups.filter((group) => {
          if (!group) return false;
          return group.groupId !== action.payload.groupId;
        }),
        albumList: [],
        postsList: [],
      };
    case "UPLOAD_POST_REQUEST":
      return {
        ...state,
        isPostUploading: true,
      };
    case "UPLOAD_POST_SUCCEED":
      const updateAlbumList = state.albumList.map((album: AlbumListItemType, idx) => {
        if (!album.base) return album;
        const updateAlbum: AlbumListItemType = {
          albumId: album.albumId,
          albumName: album.albumName,
          posts: [
            ...album.posts,
            {
              postId: action.post.postId,
              postTitle: action.post.postTitle,
              postLatitude: action.post.postLatitude,
              postLongitude: action.post.postLongitude,
            },
          ],
          base: album.base,
        };
        return updateAlbum;
      });
      const updatePostsList = updateAlbumList.map((album: AlbumListItemType) => [...album.posts]).flat();
      return {
        ...state,
        albumList: updateAlbumList,
        postsList: updatePostsList,
        isPostUploading: false,
      };
    case "UPLOAD_POST_FAILED":
      return {
        ...state,
        isPostUploading: false,
      };
    case "UPDATE_POST_REQUEST":
      return {
        ...state,
        isPostUpdateing: true,
      };
    case "UPDATE_POST_SUCCEED":
      const renewAlbumList = state.albumList.map((album: AlbumListItemType, idx) => {
        if (!album.posts.some((item) => item.postId === action.post.postId)) {
          return album;
        }
        const updateAlbum: AlbumListItemType = {
          albumId: album.albumId,
          albumName: album.albumName,
          posts: [],
          base: album.base,
        };

        updateAlbum.posts = album.posts.map((item) =>
          item.postId !== action.post.postId
            ? item
            : {
                postId: action.post.postId,
                postTitle: action.post.postTitle,
                postLatitude: action.post.postLatitude,
                postLongitude: action.post.postLongitude,
              },
        );

        return updateAlbum;
      });
      const renewPostsList = renewAlbumList.map((album: AlbumListItemType) => [...album.posts]).flat();
      return {
        ...state,
        albumList: renewAlbumList,
        postsList: renewPostsList,
        isPostUpdateing: false,
      };
    case "UPDATE_POST_FAILED":
      return {
        ...state,
        isPostUpdateing: false,
      };

    case "DELETE_POST_REQUEST":
      return {
        ...state,
        isPostDeleting: true,
      };
    case "DELETE_POST_SUCCEED":
      const afterDeleteAlbumList = state.albumList.map((album: AlbumListItemType, idx) => {
        if (!album.posts.some((item) => item.postId === action.postId)) {
          return album;
        }
        const updateAlbum: AlbumListItemType = {
          albumId: album.albumId,
          albumName: album.albumName,
          posts: [],
          base: album.base,
        };
        updateAlbum.posts = album.posts.filter((item) => item.postId != action.postId);
        return updateAlbum;
      });
      const afterDeleteList = afterDeleteAlbumList.map((album: AlbumListItemType) => [...album.posts]).flat();
      return {
        ...state,
        albumList: afterDeleteAlbumList,
        postsList: afterDeleteList,
        isPostDeleting: false,
      };
    case "DELETE_POST_FAILED":
      return {
        ...state,
        isPostDeleting: false,
      };
    case "SET_ALBUM_LIST":
      return {
        ...state,
        albumList: action.payload,
      };
    case "GET_GROUP_MEMBER_LIST_SUCCEED":
      return {
        ...state,
        selectedGroup: {
          ...state.selectedGroup,
          groupCode: action.payload.groupCode,
          users: action.payload.users,
        },
      };
    case "SET_GROUPS":
      if (!action.payload[0]) return { ...state };
      return {
        ...state,
        groups: action.payload,
      };
    case NEW_ALBUM_REQUEST:
      return {
        ...state,
        newAlbumLoading: true,
        newAlbumSucceed: false,
        newAlbumError: false,
      };
    case NEW_ALBUM_SUCCEED:
      const newAlbum: AlbumListItemType = {
        albumId: action.payload.albumId,
        albumName: action.payload.albumName,
        posts: [],
        base: false,
      };
      return {
        ...state,
        newAlbumLoading: false,
        newAlbumSucceed: true,
        newAlbumError: false,
        albumList: [newAlbum, ...state.albumList],
      };
    case NEW_ALBUM_FAILED:
      return {
        ...state,
        newAlbumLoading: false,
        newAlbumSucceed: false,
        newAlbumError: true,
      };
    case UPDATE_ALBUM_REQUEST:
      return {
        ...state,
        updateAlbumLoading: true,
        updateAlbumSucceed: false,
        updateAlbumError: false,
      };
    case UPDATE_ALBUM_SUCCEED:
      const updateAlbumListWhenSucceed = state.albumList.map((album: AlbumListItemType) => {
        if (album.albumId !== action.payload.albumId) return album;
        const updateAlbumName: AlbumListItemType = {
          albumId: action.payload.albumId,
          albumName: action.payload.albumName,
          posts: album.posts,
          base: album.base,
        };
        return updateAlbumName;
      });
      return {
        ...state,
        updateAlbumLoading: false,
        updateAlbumSucceed: true,
        updateAlbumError: false,
        albumList: updateAlbumListWhenSucceed,
      };
    case UPDATE_ALBUM_FAILED:
      return {
        ...state,
        updateAlbumLoading: false,
        updateAlbumSucceed: false,
        updateAlbumError: true,
        groups: state.groups,
      };
    case DELETE_ALBUM_REQUEST:
      return {
        ...state,
        deleteAlbumLoading: true,
        deleteAlbumSucceed: false,
        deleteAlbumError: false,
      };
    case DELETE_ALBUM_SUCCEED:
      const afterDeleteAlbum = state.albumList.filter(
        (album: AlbumListItemType) => album.albumId !== action.payload.albumId,
      );
      const deleteAlbumIdx = state.albumList.findIndex(
        (album: AlbumListItemType) => album.albumId === action.payload.albumId,
      );
      const originDeleteAlbumPosts = state.albumList[deleteAlbumIdx].posts;
      const baseAlbumIdx = afterDeleteAlbum.findIndex((album: AlbumListItemType) => album.base);
      const baseAlbumPosts = afterDeleteAlbum[baseAlbumIdx].posts;
      afterDeleteAlbum[baseAlbumIdx].posts = [...baseAlbumPosts, ...originDeleteAlbumPosts];
      return {
        ...state,
        deleteAlbumLoading: false,
        deleteAlbumSucceed: true,
        deleteAlbumError: false,
        albumList: afterDeleteAlbum,
      };
    case DELETE_ALBUM_FAILED:
      return {
        ...state,
        deleteAlbumLoading: false,
        deleteAlbumSucceed: false,
        deleteAlbumError: true,
      };
    case UPDATE_ALBUM_ORDER_REQUEST:
      return {
        ...state,
        updateAlbumOrderLoading: true,
        updateAlbumOrderSucceed: false,
        updateAlbumOrderError: false,
      };
    case UPDATE_ALBUM_ORDER_SUCCEED:
      return {
        ...state,
        updateAlbumOrderLoading: false,
        updateAlbumOrderSucceed: true,
        updateAlbumOrderError: false,
      };
    case UPDATE_ALBUM_ORDER_FAILED:
      return {
        ...state,
        updateAlbumOrderLoading: false,
        updateAlbumOrderSucceed: false,
        updateAlbumOrderError: true,
      };
    case POST_SHIFT_ALBUM_REQUEST:
      return {
        ...state,
        postShiftAlbumLoading: true,
        postShiftAlbumSucceed: false,
        postShiftAlbumError: false,
      };
    case POST_SHIFT_ALBUM_SUCCEED:
      const { postInfo, albumId } = action.payload;
      const newAlbumList = state.albumList.map((album: AlbumListItemType) => {
        if (album.albumId !== postInfo.albumId && album.albumId !== albumId) return album;
        const updateAlbum =
          album.albumId === postInfo.albumId
            ? {
                albumId: album.albumId,
                albumName: album.albumName,
                posts: album.posts.filter((now) => now.postId !== postInfo.postId),
                base: album.base,
              }
            : {
                albumId: album.albumId,
                albumName: album.albumName,
                posts: [...album.posts, { postId: postInfo.postId, postTitle: postInfo.postTitle }],
                base: album.base,
              };
        return updateAlbum;
      });
      return {
        ...state,
        postShiftAlbumLoading: false,
        postShiftAlbumSucceed: true,
        postShiftAlbumError: false,
        albumList: newAlbumList,
      };
    case POST_SHIFT_ALBUM_FAILED:
      return {
        ...state,
        postShiftAlbumLoading: false,
        postShiftAlbumSucceed: false,
        postShiftAlbumError: true,
      };
    default:
      return state;
  }
};

export default groupReducer;
