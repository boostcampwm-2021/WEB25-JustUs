import COLOR from "@styles/Color";
import { ThemeAction } from "@src/action";

interface ThemeType {
  [Key: string]: string;
}

const initState: { selectedTheme: number; nowTheme: ThemeType } = {
  selectedTheme: 1,
  nowTheme: {
    PRIMARY: COLOR.THEME1.PRIMARY,
    SECONDARY: COLOR.THEME1.SECONDARY,
    MENUTEXT: COLOR.THEME1.MENUTEXT,
  },
};

const ThemeReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ThemeAction.CHANGE_THEME:
      let nowTheme;
      switch (action.selectedTheme) {
        case 1:
          nowTheme = COLOR.THEME1;
          break;
        case 2:
          nowTheme = COLOR.THEME2;
          break;
        case 3:
          nowTheme = COLOR.THEME3;
          break;
      }
      return {
        ...state,
        nowTheme,
        selectedTheme: action.selectedTheme,
      };
    case ThemeAction.CHANGE_THEME1:
      return {
        ...state,
        nowTheme: COLOR.THEME1,
        selectedTheme: 1,
      };
    case ThemeAction.CHANGE_THEME2:
      return {
        ...state,
        nowTheme: COLOR.THEME2,
        selectedTheme: 2,
      };
    case ThemeAction.CHANGE_THEME3:
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
