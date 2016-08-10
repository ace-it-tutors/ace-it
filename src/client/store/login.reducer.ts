import { LOGIN_ACTIONS } from '../actions/login.actions';

export interface ILoginState {
  userID: string
}

const INIT_STATE: ILoginState = {
  userID: ''
};

export function loginReducer(
  state = INIT_STATE,
  action): ILoginState {
    switch (action.type) {
      case LOGIN_ACTIONS.SET_USER_ID:
        let userID = action.userID;
        return Object.assign({}, state, {
          userID
        });
      default:
        return state;
    }
}
