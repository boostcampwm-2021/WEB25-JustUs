import { GroupAction } from "@src/action";

interface GroupType {
  groupId: number;
  groupName: string;
  groupImg: string;
}
interface PostType {
  postID: number;
  postTitle: string;
  postLatitude: number;
  postLongitude: number;
}
interface AlbumListItemType {
  albumID: number;
  albumName: string;
  posts: PostType[];
}

export const CREATE_GROUP = "CREATE_GROUP";
export const GET_ALBUM_LIST = "GET_ALBUM_LIST";
export const REQUEST_DELETE = "REQUEST_DELETE";
export const DELETE_GROUP = "DELETE_GROUP";
export const GET_GROUP_MEMBER_LIST = "GET_GROUP_MEMBER_LIST";
export const GET_GROUP_LIST = "GET_GROUP_LIST";
export const SET_GROUPS = "SET_GROUPS";

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

const initState: {
  selectedGroup: GroupType | null;
  isLoading: Boolean;
  albumList: AlbumListItemType[];
  groups: Array<GroupType>;
  postsList: PostType[];
} = {
  selectedGroup: null,
  isLoading: true,
  albumList: [{ albumID: 0, albumName: "", posts: [] }],
  groups: [],
  postsList: [{ postID: -1, postTitle: "", postLatitude: 0, postLongitude: 0 }],
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
          ? { groupID: action.payload.groupID, groupName: action.payload.groupName, groupImg: action.payload.groupImg }
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
          return group.groupId !== action.payload.groupID;
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
          albumID: album.albumID,
          albumName: album.albumName,
          posts: [],
        };
        updateAlbum.posts = album.posts.filter((now) => now.postID != post.postID);
        return updateAlbum;
      });
      newAlbumList[afterIdx].posts.push(post);
      return {
        ...state,
        albumList: newAlbumList,
      };
    case "DELETE_POST":
      const targetPost = action.payload;
      const targetAlbum = state.albumList.find((album) => {
        const found = album.posts.find((innerPost) => innerPost.postID === targetPost.postID);
        if (found) return true;
      });

      if (!targetAlbum) return { ...state };

      targetAlbum.posts = targetAlbum.posts.filter((innerPost) => innerPost.postID !== targetPost.postID);

      return {
        ...state,
      };
    case "UPDATE_POST":
      const targetPost2 = action.payload;
      let targetIdx = -1;

      const targetAlbum2 = state.albumList.find((album) => {
        targetIdx = album.posts.findIndex((innerPost) => innerPost.postID === targetPost2.postID);
        if (targetIdx !== -1) return true;
      });

      if (!targetAlbum2) return { ...state };
      if (targetIdx === -1) return { ...state };

      targetAlbum2.posts[targetIdx] = targetPost2;
      return { ...state };
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
