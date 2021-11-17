export const initState = {
  userNickName: null,
  userProfile: null,
  userInfoLoading: false,
  userInfoSucceed: false,
  userInfoError: false,

  userLoggingOut: false,
};

// action
export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCEED = "USER_INFO_SUCCEED";
export const USER_INFO_FAILED = "USER_INFO_FAILED";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCEED = "LOG_OUT_SUCCEED";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";

//action creator
export const userInfoRequestAction = () => ({
  type: USER_INFO_REQUEST,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

// reducer
export const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        userInfoLoading: true,
        userInfoSucceed: false,
        userInfoError: false,
        userNickName: null,
        userProfile: null,
      };
    case USER_INFO_SUCCEED:
      return {
        ...state,
        userInfoLoading: false,
        userInfoSucceed: true,
        userInfoError: false,
        userNickName: action.data.userNickname,
        userProfile: action.data.profileImage,
      };
    case USER_INFO_FAILED:
      return {
        ...state,
        userInfoLoading: false,
        userInfoSucceed: false,
        userInfoError: true,
        userNickName: null,
        userProfile: null,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        userLoggingOut: true,
      };
    case LOG_OUT_SUCCEED:
      return {
        ...state,
        userLoggingOut: false,
        userInfoSucceed: false,
        userNickName: null,
        userProfile: null,
      };
    case LOG_OUT_FAILED:
      return {
        ...state,
        userLoggingOut: false,
      };
    default:
      return state;
  }
};

export default userReducer;
