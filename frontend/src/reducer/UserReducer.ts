export const initState = {
  userNickName: null,
  userProfile: null,
  userInfoLoading: null,
  userInfoSucceed: null,
  userInfoError: null,
};

// action
export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCEED = "USER_INFO_SUCCEED";
export const USER_INFO_FAILED = "USER_INFO_FAILED";

//action creator
export const userInfoRequestAction = () => ({
  type: USER_INFO_REQUEST,
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
        userNickName: null,
        userProfile: null,
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
        userInfoError: true,
        userNickName: null,
        userProfile: null,
      };
    default:
      return state;
  }
};

export default userReducer;
