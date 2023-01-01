import {
  RAISE_TICKET_ERROR,
  RAISE_TICKET_LOADING,
  RAISE_TICKET_SUCCESS,
} from "../actions/types";

export default function raiseTicketReducer(state = {}, action) {
  switch (action.type) {
    case RAISE_TICKET_SUCCESS:
      return action.data;
    case RAISE_TICKET_ERROR:
      return action.data;
    case RAISE_TICKET_LOADING:
      return action.data;
    default:
      return state;
  }
}
