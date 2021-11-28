const userAction = {
  USER_INFO_REQUEST: "USER_INFO_REQUEST",
  USER_INFO_SUCCEED: "USER_INFO_SUCCEED",
  USER_INFO_FAILED: "USER_INFO_FAILED",
  USER_INFO_INIT: "USER_INFO_INIT",
  USER_INFO_UPDATE: "USER_INFO_UPDATE",
  SET_UPDATED_USER_INFO: "SET_UPDATED_USER_INFO",
  SET_UPDATE_FAIL: "SET_UPDATE_FAIL",
  SET_UPDATED_INIT: "SET_UPDATED_INIT",
  LOG_OUT_REQUEST: "LOG_OUT_REQUEST",
  LOG_OUT_SUCCEED: "LOG_OUT_SUCCEED",
  LOG_OUT_FAILED: "LOG_OUT_FAILED",
  REQUEST_UPDATE_GROUP_ORDER: "REQUEST_UPDATE_GROUP_ORDER",

  userInfoRequestAction: () => ({
    type: userAction.USER_INFO_REQUEST,
  }),

  logoutRequestAction: () => ({
    type: userAction.LOG_OUT_REQUEST,
  }),

  userInfoUpdateAction: (payload: any) => ({
    type: userAction.USER_INFO_UPDATE,
    payload,
  }),

  updateGroupOrderAction: (payload: any) => ({
    type: userAction.REQUEST_UPDATE_GROUP_ORDER,
    payload,
  }),
};

export default userAction;
