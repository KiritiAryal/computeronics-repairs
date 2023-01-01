import { LOGIN_MENU_CLICKED_VALUE, OPEN_LOGIN_DIALOG } from "./types";
export const loginMenuClickedValueAction = (menuItemClicked: string) => {
  return { type: LOGIN_MENU_CLICKED_VALUE, data: { item: menuItemClicked } };
};

export const openDialogAction = (isDialogOpen: boolean) => {
  return { type: OPEN_LOGIN_DIALOG, data: { isDialogOpen } };
};

