import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { IAppState } from '../store';


export const LOGIN_ACTIONS = {
  SET_USER_ID: 'SET_USER_ID',
  GET_USER_ID: 'GET_USER_ID',

};

@Injectable()
export class LoginActions {
  constructor(private ngRedux: NgRedux<any>) {}

  setDispatch(id: string) {
    this.ngRedux.dispatch(this.setID(id));
  }

  getDispatch(userID: string) {
    this.ngRedux.dispatch(this.getProfile(userID));
  }

  private setID(id: string) {
    return {
      type: LOGIN_ACTIONS.SET_USER_ID,
      payload: id
    };
  }

  private getProfile(userID: string) {
    return {
      type: LOGIN_ACTIONS.GET_USER_ID,
      payload: userID
    };
  }


}
