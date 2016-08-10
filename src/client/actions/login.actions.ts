import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { IAppState } from '../store';


export const LOGIN_ACTIONS = {
  SET_USER_ID: 'SET_USER_ID'
};

@Injectable()
export class LoginActions {
  constructor(private ngRedux: NgRedux<any>) {}

  setLoginDispatch(id: string) {
    console.log("YOOO I'm in setLoginDispatch and I'm about to dispatch setId");
    this.ngRedux.dispatch(this.setID(id));
  }

  private setID(id: string) {
    return {
      type: LOGIN_ACTIONS.SET_USER_ID,
      payload: id
    };
  }

}
