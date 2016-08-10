import { LOGIN_ACTIONS } from '../actions/login.actions';

export interface ILoginState {
  userID: string
}

const INIT_STATE: ILoginState = {
  userID: ''
};

export function searchReducer(
  state = INIT_STATE,
  action): ILoginState {

  switch (action.type) {
    case LOGIN_ACTIONS.SET_USER_ID:
      console.log("Oh hello, I'm the login reducer. Action.payload: ", action.payload, " state: ", state);
      let userID = action.payload.userID;
      return Object.assign({}, state, {
        userID
      });
    default:
      return state;
  }
}
