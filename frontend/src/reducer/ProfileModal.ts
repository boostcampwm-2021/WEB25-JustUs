const initState = {
  clickedTarget: { element: document.body },
  userInfoModalOpened: false,
  themeSettingModalOpened: false,
};

const profileModalReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_CLICKED_TARGET":
      return {
        ...state,
        clickedTarget: { element: action.payload },
      };
    case "OPEN_USER_INFO_MODAL":
      return {
        ...state,
        userInfoModalOpened: true,
      };
    case "CLOSE_USER_INFO_MODAL":
      return {
        ...state,
        userInfoModalOpened: false,
      };
    case "OPEN_THEME_SETTING_MODAL":
      return {
        ...state,
        themeSettingModalOpened: true,
      };
    case "CLOSE_THEME_SETTING_MODAL":
      return {
        ...state,
        themeSettingModalOpened: false,
      };

    default:
      return state;
  }
};

export default profileModalReducer;
