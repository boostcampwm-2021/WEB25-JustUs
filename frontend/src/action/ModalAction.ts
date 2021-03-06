const modalAction = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  SET_SELECTED_ALBUM: "SET_SELECTED_ALBUM",
  SELECT_POST_REQUEST: "SELECT_POST_REQUEST",
  SELECT_POST_INIT: "SELECT_POST_INIT",
  SELECT_POST_FAILED: "SELECT_POST_FAILED",
  SET_CLUSTERED_MARKER: "SET_CLUSTERED_MARKER",
  SET_PROFILE_WRAPPER_MODAL_OPENED: "SET_PROFILE_WRAPPER_MODAL_OPENED",
  SET_ALBUM_SETTING_WRAPPER_MODAL_IDX: "SET_ALBUM_SETTING_WRAPPER_MODAL_IDX",
  SELECT_POST_SUCCEED: "SELECT_POST_SUCCEED",
  SET_ADD_ALBUM_MODAL_OPENED: "SET_ADD_ALBUM_MODAL_OPENED",
  OPEN_SEARCHLIST: "OPEN_SEARCHLIST",
  OPEN_RECOMMENDLIST: "OPEN_RECOMMENDLIST",
  CLOSE_SEARCHLIST: "CLOSE_SEARCHLIST",
  CLOSE_RECOMMENDLIST: "CLOSE_RECOMMENDLIST",

  openModalAction: (payload: string) => ({ type: modalAction.OPEN_MODAL, payload }),
  closeModalAction: () => ({ type: modalAction.CLOSE_MODAL }),
  setProfileWrapperModalOpenedAction: (payload: { isProfileWrapperModalOpened: boolean }) => ({
    type: modalAction.SET_PROFILE_WRAPPER_MODAL_OPENED,
    payload,
  }),
  selectPostRequestAction: (postId: number) => ({ type: modalAction.SELECT_POST_REQUEST, postId }),
  setSelectedAlbumAction: (payload: { albumId: number; albumName: string }) => ({
    type: modalAction.SET_SELECTED_ALBUM,
    payload,
  }),

  setAlbumSettingWrapperModalIdxAction: (payload: { albumSettingWrapperModalIdx: number }) => ({
    type: modalAction.SET_ALBUM_SETTING_WRAPPER_MODAL_IDX,
    payload,
  }),

  setAddAlbumModalOpened: (payload: { isAddAlbumModalOpened: boolean }) => ({
    type: modalAction.SET_ADD_ALBUM_MODAL_OPENED,
    payload,
  }),

  initSelectPost: () => ({
    type: modalAction.SELECT_POST_INIT,
  }),

  openSearchList: () => ({ type: modalAction.OPEN_SEARCHLIST }),
  openRecommendList: () => ({ type: modalAction.OPEN_RECOMMENDLIST }),
  closeSearchList: () => ({ type: modalAction.CLOSE_SEARCHLIST }),
  closeRecommendList: () => ({ type: modalAction.CLOSE_RECOMMENDLIST }),
};

export default modalAction;
