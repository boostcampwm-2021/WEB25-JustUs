import { GroupAction } from "@src/action";

interface GroupType {
  groupID: number;
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
  albumID: number;
  albumName: string;
  posts: PostType[];
  base: boolean;
}

export const CREATE_GROUP = "CREATE_GROUP";
export const GET_ALBUM_LIST = "GET_ALBUM_LIST";
export const DELETE_GROUP = "DELETE_GROUP";

export const createGroupAction = (payload: any) => ({
  type: CREATE_GROUP,
  payload,
});

export const getAlbumListAction = (payload: any) => ({
  type: GET_ALBUM_LIST,
  payload,
});

export const deleteGroupAction = (payload: any) => ({
  type: DELETE_GROUP,
  payload,
});

const initState: {
  selectedGroup: GroupType | null;
  isLoading: Boolean;
  albumList: AlbumListItemType[];
  postsList: PostType[];
  isPostUploading: boolean;
  isPostUpdateing: boolean;
  groups: Array<GroupType>;
} = {
  selectedGroup: null,
  isLoading: true,
  albumList: [{ albumID: 0, albumName: "", posts: [], base: false }],
  isPostUploading: false,
  isPostUpdateing: false,
  groups: [
    {
      groupID: 0,
      groupName: "그룹 A",
      groupImg: "/img/dummy-group1.png",
    },
    {
      groupID: 1,
      groupName: "그룹 B",
      groupImg: "/img/dummy-group2.png",
    },
    {
      groupID: 2,
      groupName: "그룹 C",
      groupImg: "/img/dummy-group3.png",
    },
  ],
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
          ? { groupID: action.payload.groupID, groupName: action.payload.groupName, groupImg: action.payload.groupImg }
          : null,
        albumList: action.payload.albumList,
        postsList: action.payload.albumList.map((album: AlbumListItemType) => [...album.posts]).flat(),
      };
    case GroupAction.DELETE_GROUP:
      return {
        ...state,
        selectedGroup: null,
        groups: state.groups.filter((group) => group.groupID !== action.payload.groupID),
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
          albumID: album.albumID,
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
        postList: updatePostsList,
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

        // const { post } = action;
        const updateAlbum: AlbumListItemType = {
          albumID: album.albumID,
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
        postList: renewPostsList,
        isPostUpdateing: false,
      };
    case "UPDATE_POST_FAILED":
      return {
        ...state,
        isPostUpdateing: false,
      };

    case "DELETE_POST":
      const targetPost = action.payload;
      const targetAlbum = state.albumList.find((album) => {
        const found = album.posts.find((innerPost) => innerPost.postId === targetPost.postId);
        if (found) return true;
      });

      if (!targetAlbum) return { ...state };

      targetAlbum.posts = targetAlbum.posts.filter((innerPost) => innerPost.postId !== targetPost.postId);

      return {
        ...state,
      };

    case "SET_ALBUM_LIST":
      return {
        ...state,
        albumList: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
