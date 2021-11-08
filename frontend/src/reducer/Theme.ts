import COLOR from "@styles/Color";

interface ThemeType {
  [Key: string]: string;
}

const initState: { selectedTheme: number; nowTheme: ThemeType } = {
  selectedTheme: 1,
  nowTheme: {
    PRIMARY: COLOR.THEME1.PRIMARY,
    SECONDARY: COLOR.THEME1.SECONDARY,
  },
};

const ThemeReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CHANGE_THEME1":
      return {
        ...state,
        nowTheme: COLOR.THEME1,
        selectedTheme: 1,
      };
    case "CHANGE_THEME2":
      return {
        ...state,
        nowTheme: COLOR.THEME2,
        selectedTheme: 2,
      };
    case "CHANGE_THEME3":
      return {
        ...state,
        nowTheme: COLOR.THEME3,
        selectedTheme: 3,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
