const themeAction = {
  CHANGE_THEME: "CHANGE_THEME",
  CHANGE_THEME1: "CHANGE_THEME1",
  CHANGE_THEME2: "CHANGE_THEME2",
  CHANGE_THEME3: "CHANGE_THEME3",

  changeThemeAction: (selectedTheme: number) => {
    return {
      type: themeAction.CHANGE_THEME,
      selectedTheme,
    };
  },
};

export default themeAction;
