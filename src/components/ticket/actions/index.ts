import {
  RAISE_TICKET_ERROR,
  RAISE_TICKET_LOADING,
  RAISE_TICKET_SUCCESS,
} from "./types";

import { TicketFormModel } from "../../../models/ticket";
import { METHOD } from "../../../models/common";
import { RAISE_TICKET } from "../../../api/url";
import { fetchResource } from "../../../api/fetch";

export const raiseTicketLoadingAction = () => {
  return { type: RAISE_TICKET_LOADING, data: { loading: true } };
};

export const raiseTicketSuccessAction = (data: any) => {
  return { type: RAISE_TICKET_SUCCESS, data };
};

export const raiseTicketErrorAction = (error: any = { error: true }) => {
  return { type: RAISE_TICKET_ERROR, data: error };
};

export const raiseTicketAction = (payload: TicketFormModel): any => {
  return async (dispatch: any) => {
    const data = {
      method: METHOD.POST,
      url: RAISE_TICKET,
      data: payload,
    };
    try {
      const res = await fetchResource(data);
      const result = await res?.json();
      if (res.status == 200 || res.status == 201) {
        dispatch(raiseTicketSuccessAction(result));
      } else {
        dispatch(raiseTicketErrorAction(result));
      }
      console.log(result);
    } catch (err) {
      console.log(err);
      dispatch(raiseTicketErrorAction());
    }
  };
};
