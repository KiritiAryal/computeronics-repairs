import { combineReducers } from "redux";
import getLoginClickedReducer from "../components/common/reducer";
import openDialogReducer from "../components/common/reducer/openDialog";
import loginReducer from "../components/login/reducer";
import raiseTicketReducer from "../components/ticket/reducer";

const rootReducer = combineReducers({
  loginMenuItem: getLoginClickedReducer,
  user: loginReducer,
  openDialog: openDialogReducer,
  raiseTicket: raiseTicketReducer,
});

export default rootReducer;
