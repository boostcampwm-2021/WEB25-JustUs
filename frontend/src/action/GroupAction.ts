interface FileObject {
  imageUrl: File | string;
  imageId: string;
}
interface IPost {
  postTitle: string;
  postContent: string;
  postDate: string;
  postLocation: string;
  postLatitude: number;
  postLongitude: number;
  groupId: number;
  postImage: FileObject[];
}
interface IUpdatePost {
  postTitle: string;
  postContent: string;
  postDate: string;
  postLocation: string;
  postLatitude: number;
  postLongitude: number;
  groupId: number;
  postId: number;
  addImages: FileObject[];
  deleteImagesId: string[];
}

const groupAction = {
  ADD_GROUP: "ADD_GROUP",
  SET_SELECTED_GROUP: "SET_SELECTED_GROUP",
  SET_SELECTED_GROUP_IDX: "SET_SELECTED_GROUP_IDX",
  DELETE_GROUP: "DELETE_GROUP",
  MOVE_POST: "MOVE_POST",
  CREATE_GROUP: "CREATE_GROUP",
  GET_ALBUM_LIST: "GET_ALBUM_LIST",
  REQUEST_DELETE: "REQUEST_DELETE",
  REQUEST_GROUP_INFO: "REQUEST_GROUP_INFO",
  FAILURE_GROUP_INFO: "FAILURE_GROUP_INFO",
  SUCCESS_GROUP_INFO: "SUCCESS_GROUP_INFO",
  GET_GROUP_MEMBER_LIST: "GET_GROUP_MEMBER_LIST",
  GET_GROUP_MEMBER_LIST_SUCCEED: "GET_GROUP_MEMBER_LIST_SUCCEED",
  GET_GROUP_LIST_REQUEST: "GET_GROUP_LIST_REQUEST",
  GET_GROUP_LIST_SUCCEED: "GET_GROUP_LIST_SUCCEED",
  GET_GROUP_LIST_FAILED: "GET_GROUP_LIST_FAILED",
  REQUEST_JOIN_GROUP: "REQUEST_JOIN_GROUP",
  SET_JOIN_GROUP_SUCCEED: "SET_JOIN_GROUP_SUCCEED",
  REQUEST_UPDATE_GROUP: "REQUEST_UPDATE_GROUP",
  NEW_ALBUM_REQUEST: "NEW_ALBUM_REQUEST",
  NEW_ALBUM_SUCCEED: "NEW_ALBUM_SUCCEED",
  NEW_ALBUM_FAILED: "NEW_ALBUM_FAILED",
  SET_ALBUM_LIST: "SET_ALBUM_LIST",
  UPDATE_ALBUM_REQUEST: "UPDATE_ALBUM_REQUEST",
  UPDATE_ALBUM_SUCCEED: "UPDATE_ALBUM_SUCCEED",
  UPDATE_ALBUM_FAILED: "UPDATE_ALBUM_FAILED",
  DELETE_ALBUM_REQUEST: "DELETE_ALBUM_REQUEST",
  DELETE_ALBUM_SUCCEED: "DELETE_ALBUM_SUCCEED",
  DELETE_ALBUM_FAILED: "DELETE_ALBUM_FAILED",
  UPDATE_ALBUM_ORDER_REQUEST: "UPDATE_ALBUM_ORDER_REQUEST",
  UPDATE_ALBUM_ORDER_SUCCEED: "UPDATE_ALBUM_ORDER_SUCCEED",
  UPDATE_ALBUM_ORDER_FAILED: "UPDATE_ALBUM_ORDER_FAILED",
  UPLOAD_POST_REQUEST: "UPLOAD_POST_REQUEST",
  UPLOAD_POST_SUCCEED: "UPLOAD_POST_SUCCEED",
  UPLOAD_POST_FAILED: "UPLOAD_POST_FAILED",
  UPDATE_POST_REQUEST: "UPDATE_POST_REQUEST",
  UPDATE_POST_SUCCEED: "UPDATE_POST_SUCCEED",
  UPDATE_POST_FAILED: "UPDATE_POST_FAILED",
  DELETE_POST_REQUEST: "DELETE_POST_REQUEST",
  DELETE_POST_SUCCEED: "DELETE_POST_SUCCEED",
  DELETE_POST_FAILED: "DELETE_POST_FAILED",
  POST_SHIFT_ALBUM_REQUEST: "POST_SHIFT_ALBUM_REQUEST",
  POST_SHIFT_ALBUM_SUCCEED: "POST_SHIFT_ALBUM_SUCCEED",
  POST_SHIFT_ALBUM_FAILED: "POST_SHIFT_ALBUM_FAILED",
  REQUEST_HASHTAGS: "REQUEST_HASHTAGS",
  SET_HASHTAGS: "SET_HASHTAGS",
  REQUEST_POSTS_BY_HASHTAG: "REQUEST_POSTS_BY_HASHTAG",
  SET_SEARCHLIST: "SET_SEARCHLIST",

  createGroupAction: (payload: any) => ({
    type: groupAction.CREATE_GROUP,
    payload,
  }),

  getAlbumListAction: (payload: any) => ({
    type: groupAction.GET_ALBUM_LIST,
    payload,
  }),

  deleteGroupAction: (payload: any) => ({
    type: groupAction.REQUEST_DELETE,
    payload,
  }),

  getGroupMemberListAction: (payload: any) => ({
    type: groupAction.GET_GROUP_MEMBER_LIST,
    payload,
  }),

  getGroupListAction: () => ({
    type: groupAction.GET_GROUP_LIST_REQUEST,
  }),

  requestJoinGroupAction: (payload: any) => ({
    type: groupAction.REQUEST_JOIN_GROUP,
    payload,
  }),

  newAlbumRequestAction: (albumName: string, groupId: number) => ({
    type: groupAction.NEW_ALBUM_REQUEST,
    payload: {
      albumName,
      groupId,
    },
  }),

  updateAlbumRequestAction: (albumName: string, albumId: number) => {
    return {
      type: groupAction.UPDATE_ALBUM_REQUEST,
      payload: {
        albumName,
        albumId,
      },
    };
  },

  deleteAlbumRequestAction: (albumId: number) => {
    return {
      type: groupAction.DELETE_ALBUM_REQUEST,
      payload: {
        albumId,
      },
    };
  },

  updateAlbumOrderAction: (groupId: number, albumOrder: string) => {
    return {
      type: groupAction.UPDATE_ALBUM_ORDER_REQUEST,
      payload: {
        groupId,
        albumOrder,
      },
    };
  },

  postShiftAlbumAction: (postInfo: { postId: number; postTitle: string; albumId: number }, albumId: number) => {
    return {
      type: groupAction.POST_SHIFT_ALBUM_REQUEST,
      payload: {
        postInfo,
        albumId,
      },
    };
  },

  updateGroupAction: (payload: any) => ({
    type: groupAction.REQUEST_UPDATE_GROUP,
    payload,
  }),

  requestHashtagsAction: (payload: any) => ({
    type: groupAction.REQUEST_HASHTAGS,
    payload,
  }),

  requestPostsByHashtag: (payload: any) => ({
    type: groupAction.REQUEST_POSTS_BY_HASHTAG,
    payload,
  }),

  uploadPostRequestAction: (post: IPost) => ({ type: groupAction.UPLOAD_POST_REQUEST, post }),
  updatePostRequestAction: (post: IUpdatePost) => ({ type: groupAction.UPDATE_POST_REQUEST, post }),
  deletePostRequestAction: (postId: number) => ({ type: groupAction.DELETE_POST_REQUEST, postId }),
  setSelectedGroupIdxAction: (payload: { selectedGroupIdx: number }) => ({
    type: groupAction.SET_SELECTED_GROUP_IDX,
    payload,
  }),
};

export default groupAction;
