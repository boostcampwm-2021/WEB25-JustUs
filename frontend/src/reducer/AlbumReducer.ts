export const initState = {
  newAlbumLoading: false,
  newAlbumSucceed: false,
  newAlbumError: false,

  updateAlbumLoading: false,
  updateAlbumSucceed: false,
  updateAlbumError: false,
};

// action
export const NEW_ALBUM_REQUEST = "NEW_ALBUM_REQUEST";
export const NEW_ALBUM_SUCCEED = "NEW_ALBUM_SUCCEED";
export const NEW_ALBUM_FAILED = "NEW_ALBUM_FAILED";

export const UPDATE_ALBUM_REQUEST = "UPDATE_ALBUM_REQUEST";
export const UPDATE_ALBUM_SUCCEED = "UPDATE_ALBUM_SUCCEED";
export const UPDATE_ALBUM_FAILED = "UPDATE_ALBUM_FAILED";

//action creator
export const newAlbumRequestAction = (albumName: string, groupId: number) => ({
  type: NEW_ALBUM_REQUEST,
  payload: {
    albumName,
    groupId,
  },
});

export const updateAlbumRequestAction = (albumName: string, albumId: number) => ({
  type: UPDATE_ALBUM_REQUEST,
  payload: {
    albumName,
    albumId,
  },
});

// reducer
export const albumReducer = (state = initState, action: any) => {
  switch (action.type) {
    case NEW_ALBUM_REQUEST:
      return {
        ...state,
        newAlbumLoading: true,
        newAlbumSucceed: false,
        newAlbumError: false,
      };
    case NEW_ALBUM_SUCCEED:
      return {
        ...state,
        newAlbumLoading: false,
        newAlbumSucceed: true,
        newAlbumError: false,
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
        updateAlbumLoading: true,
        updateAlbumSucceed: false,
        updateAlbumError: false,
      };
    case UPDATE_ALBUM_SUCCEED:
      return {
        updateAlbumLoading: false,
        updateAlbumSucceed: true,
        updateAlbumError: false,
      };
    case UPDATE_ALBUM_FAILED:
      return {
        updateAlbumLoading: false,
        updateAlbumSucceed: false,
        updateAlbumError: true,
      };
    default:
      return state;
  }
};

export default albumReducer;
