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

export const CREATE_GROUP = "CREATE_GROUP";
export const GET_ALBUM_LIST = "GET_ALBUM_LIST";
export const REQUEST_DELETE = "REQUEST_DELETE";
export const DELETE_GROUP = "DELETE_GROUP";
export const GET_GROUP_MEMBER_LIST = "GET_GROUP_MEMBER_LIST";
export const GET_GROUP_LIST = "GET_GROUP_LIST";
export const SET_GROUPS = "SET_GROUPS";
export const REQUEST_JOIN_GROUP = "REQUEST_JOIN_GROUP";

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

const initState: {
  selectedGroup: GroupType | null;
  isLoading: Boolean;
  albumList: AlbumListItemType[];
  postsList: PostType[];
  isPostUploading: boolean;
  isPostUpdateing: boolean;
  isPostDeleting: boolean;
  groups: Array<GroupType>;
} = {
  selectedGroup: null,
  isLoading: true,
  groups: [],
  albumList: [{ albumId: 0, albumName: "", posts: [], base: false }],
  isPostUploading: false,
  isPostUpdateing: false,
  isPostDeleting: false,
  postsList: [{ postId: -1, postTitle: "", postLatitude: 0, postLongitude: 0 }],
};

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
          ? { groupId: action.payload.groupId, groupName: action.payload.groupName, groupImg: action.payload.groupImg }
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
    case GroupAction.MOVE_POST:
      const beforeIdx = action.payload.beforeIdx;
      const afterIdx = action.payload.afterIdx;
      const post = action.payload.post;
      const newAlbumList = state.albumList.map((album: AlbumListItemType, idx) => {
        if (idx != beforeIdx) return album;
        const updateAlbum: AlbumListItemType = {
          albumId: album.albumId,
          albumName: album.albumName,
          posts: [],
          base: album.base,
        };
        updateAlbum.posts = album.posts.filter((now) => now.postId != post.postId);
        return updateAlbum;
      });
      newAlbumList[afterIdx].posts.push(post);
      return {
        ...state,
        albumList: newAlbumList,
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
        if (album.posts.some((item) => item.postId != action.post.postId)) {
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
        if (!album.posts.some((item) => item.postId == action.postId)) {
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
      return {
        ...state,
        groups: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
