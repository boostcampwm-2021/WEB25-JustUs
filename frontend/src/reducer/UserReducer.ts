import { UserAction } from "@src/action";

export const initState = {
  userNickName: null,
  userProfile: null,
  userId: null,
  userInfoLoading: false,
  userInfoSucceed: false,
  userInfoError: false,

  userLoggingOut: false,

  updateUserNickName: null,
  updateUserProfile: null,
  updateSucceed: null,
};

// reducer
export const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case UserAction.USER_INFO_REQUEST:
      return {
        ...state,
        userInfoLoading: true,
        userInfoSucceed: false,
        userInfoError: false,
        userLoggingOut: false,
        userLoggedOut: false,
      };
    case UserAction.USER_INFO_SUCCEED:
      return {
        ...state,
        userInfoLoading: false,
        userInfoSucceed: true,
        userInfoError: false,
        userNickName: action.data.userNickname,
        userProfile: action.data.profileImage,
        userId: action.data.userId,
      };
    case UserAction.USER_INFO_FAILED:
      return {
        ...state,
        userInfoLoading: false,
        userInfoSucceed: false,
        userInfoError: true,
        userNickName: null,
        userProfile: null,
        userId: null,
      };
    case UserAction.USER_INFO_INIT:
      return {
        ...state,
        userInfoLoading: false,
        userInfoSucceed: false,
        userInfoError: false,
        userLoggingOut: false,
        userLoggedOut: false,
      };
    case UserAction.LOG_OUT_REQUEST:
      return {
        ...state,
        userLoggingOut: true,
        userLoggedOut: false,
      };
    case UserAction.LOG_OUT_SUCCEED:
      return {
        ...state,
        userLoggingOut: false,
        userLoggedOut: true,
        userInfoSucceed: false,
        userNickName: null,
        userProfile: null,
        userId: null,
      };
    case UserAction.LOG_OUT_FAILED:
      return {
        ...state,
        userLoggingOut: false,
        userLoggedOut: false,
      };
    case UserAction.USER_INFO_UPDATE:
      return {
        ...state,
        updateUserNickName: action.payload.updateUserNickName,
        updateUserProfile: action.payload.updateUserProfile,
      };
    case UserAction.SET_UPDATED_USER_INFO:
      return {
        ...state,
        updateUserNickName: null,
        updateUserProfile: null,
        userNickName: action.payload.userNickName,
        userProfile: action.payload.userProfile,
        updateSucceed: true,
      };
    case UserAction.SET_UPDATE_FAIL:
      return {
        ...state,
        updateUserNickName: null,
        updateUserProfile: null,
        updateSucceed: false,
      };
    case UserAction.SET_UPDATED_INIT:
      return {
        ...state,
        updateSucceed: null,
      };
    default:
      return state;
  }
};

export default userReducer;
