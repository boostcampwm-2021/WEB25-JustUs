import { GroupAction } from "@src/action";

interface GroupType {
  groupID: number;
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
  base: boolean;
}

const initState: {
  selectedGroup: GroupType | null;
  isLoading: Boolean;
  albumList: AlbumListItemType[];
  postsList: PostType[];
  uploadPost: PostType | null;
  isPostUploading: boolean;
  groups: Array<GroupType>;
} = {
  selectedGroup: null,
  isLoading: true,
  albumList: [{ albumID: 0, albumName: "", posts: [], base: false }],
  postsList: [],
  uploadPost: null,
  isPostUploading: false,
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
        selectedGroup: state.groups.filter((group) => group.groupID !== action.payload.groupID),
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
        updateAlbum.posts = album.posts.filter((now) => now.postID != post.postID);
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
        uploadPost: action.post,
      };
    case "UPLOAD_POST_SUCCEED":
      const updateAlbumList = state.albumList.map((album: AlbumListItemType, idx) => {
        if (!album.base || !state.uploadPost) return album;
        const updateAlbum: AlbumListItemType = {
          albumID: album.albumID,
          albumName: album.albumName,
          posts: [
            ...album.posts,
            {
              postID: action.postID,
              postTitle: state.uploadPost.postTitle,
              postLatitude: state.uploadPost.postLatitude,
              postLongitude: state.uploadPost.postLongitude,
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
        uploadPost: null,
      };
    case "UPLOAD_POST_FAILED":
      return {
        ...state,
        isPostUploading: false,
        uploadPost: null,
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

    default:
      return state;
  }
};

export default groupReducer;
