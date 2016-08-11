import { LOGIN_ACTIONS } from '../actions/login.actions';
import { LOGOUT_ACTIONS } from '../actions/logout.actions';


export interface ILoginState {
  userID: string;
}

const INIT_STATE: ILoginState = {
  userID: ''
};

export function loginReducer(
  state = INIT_STATE,
  action
  ): ILoginState {
    switch (action.type) {
      case LOGIN_ACTIONS.SET_USER_ID:
        let userID = action.userID;
        return Object.assign({}, state, {
          userID
        });
      case LOGIN_ACTIONS.SET_USER_DATA:
        let userData = action.userData;
        return Object.assign({}, state, {
          userData: userData
        });
      case LOGOUT_ACTIONS.LOGOUT:
          return Object.assign({}, state, {
            userID: ''
        });
      default:
        return state;
    }
}
