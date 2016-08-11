import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export const LOGIN_ACTIONS = {
  SET_USER_ID: 'SET_USER_ID',
  SET_USER_DATA: 'SET_USER_DATA'
};

@Injectable()
export class LoginActions {

  private userUrl: string = '/api/users/';

  constructor(
    private ngRedux: NgRedux<any>,
    private http: Http
    ) {}


  setAuthDispatch(authID: string, email: string) {
    const envelope = {
      authID: authID,
      email: email
    };

    this.setAuthID(authID, envelope);
    this.setAuthState(authID);
  }

  private setAuthID(authID: string, data: Object) {
    return this.http.post(this.userUrl + authID, data);
  }

  private setAuthState(authID: string) {
   this.ngRedux.dispatch(this.setAuth(authID));
  }

  private setAuth(authID: string) {
    return {
      type: LOGIN_ACTIONS.SET_USER_ID,
      userID: authID
    };
  }

  setDataDispatch(userData: Object) {
      this.ngRedux.dispatch(this.setUserData(userData));
    }

  private setUserData(userData: Object) {
    return {
      type: LOGIN_ACTIONS.SET_USER_DATA,
      userData: userData
    };
  }

}
