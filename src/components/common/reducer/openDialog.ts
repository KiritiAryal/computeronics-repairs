import { OPEN_LOGIN_DIALOG } from "../actions/types";
export default function openDialogReducer(
  state = { isDialogOpen: false },
  action: { data: { isDialogOpen: boolean }; type: string }
) {
  switch (action.type) {
    case OPEN_LOGIN_DIALOG:
      return action.data;
    default:
      return state;
  }
}
