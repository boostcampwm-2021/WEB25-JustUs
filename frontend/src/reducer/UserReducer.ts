export const initState = {
  userNickName: null,
  userProfile: null,
  userInfoLoading: null,
  userInfoSucceed: null,
  userInfoError: null,
  updateUserNickName: null,
  updateUserProfile: null,
  updateSucceed: null,
};

// action
export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCEED = "USER_INFO_SUCCEED";
export const USER_INFO_FAILED = "USER_INFO_FAILED";
export const USER_INFO_UPDATE = "USER_INFO_UPDATE";
export const SET_UPDATED_USER_INFO = "SET_UPDATED_USER_INFO";
export const SET_UPDATE_FAIL = "SET_UPDATE_FAIL";
export const SET_UPDATED_INIT = "SET_UPDATED_INIT";

//action creator
export const userInfoRequestAction = () => ({
  type: USER_INFO_REQUEST,
});

export const userInfoUpdateAction = (payload: any) => ({
  type: USER_INFO_UPDATE,
  payload,
});

// reducer
export const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        userInfoLoading: true,
        userInfoSucceed: false,
        userInfoError: null,
      };
    case USER_INFO_SUCCEED:
      return {
        ...state,
        userInfoLoading: false,
        userInfoSucceed: true,
        userInfoError: null,
        userNickName: action.data.userNickname,
        userProfile: action.data.profileImage,
      };
    case USER_INFO_FAILED:
      return {
        ...state,
        userInfoLoading: false,
        userInfoSucceed: false,
        userInfoError: action.error,
      };
    case USER_INFO_UPDATE:
      return {
        ...state,
        updateUserNickName: action.payload.updateUserNickName,
        updateUserProfile: action.payload.updateUserProfile,
      };
    case SET_UPDATED_USER_INFO:
      return {
        ...state,
        updateUserNickName: null,
        updateUserProfile: null,
        userNickName: action.payload.userNickName,
        userProfile: action.payload.userProfile,
        updateSucceed: true,
      };
    case SET_UPDATE_FAIL:
      return {
        ...state,
        updateUserNickName: null,
        updateUserProfile: null,
        updateSucceed: false,
      };
    case SET_UPDATED_INIT:
      return {
        ...state,
        updateSucceed: null,
      };
    default:
      return state;
  }
};

export default userReducer;
