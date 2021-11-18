export const initState = {
  newAlbumLoading: false,
  newAlbumSucceed: false,
  newAlbumError: false,
};

// action
export const NEW_ALBUM_REQUEST = "NEW_ALBUM_REQUEST";
export const NEW_ALBUM_SUCCEED = "NEW_ALBUM_SUCCEED";
export const NEW_ALBUM_FAILED = "NEW_ALBUM_FAILED";

//action creator
export const newAlbumRequestAction = (albumName: string, groupId: number) => ({
  type: NEW_ALBUM_REQUEST,
  payload: {
    albumName,
    groupId,
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
    default:
      return state;
  }
};

export default albumReducer;
