import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const LOGIN_ACTIONS = {
  SET_USER_ID: 'SET_USER_ID'
};

@Injectable()
export class LoginActions {
  constructor(private ngRedux: NgRedux<any>) {}

  setLoginDispatch(id: string) {
    this.ngRedux.dispatch({
      type: LOGIN_ACTIONS.SET_USER_ID,
      userID: id
    });
  }
}
