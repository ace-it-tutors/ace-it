import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export const LOGOUT_ACTIONS = {
  LOGOUT: 'LOGOUT'
};

@Injectable()
export class LogoutActions {

  constructor(
    private ngRedux: NgRedux<any>,
    private http: Http
    ) {}

  public setLogoutDispatch() {
    this.ngRedux.dispatch({
      type: LOGOUT_ACTIONS.LOGOUT
    });
  }

}

