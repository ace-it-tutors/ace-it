import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

export const LOGIN_ACTIONS = {
  SET_USER_ID: 'SET_USER_ID'
};

@Injectable()
export class LoginActions {

  private userUrl: string = '/api/users/';

  constructor(
    private ngRedux: NgRedux<any>,
    private http: Http
    ) {}

  setLoginDispatch(authID: string, email: string) {
    const envelope = {
      authID: authID,
      email: email
    }

    //call local setAuthID function
    this.setAuthID(authID, envelope)

    this.ngRedux.dispatch({
      type: LOGIN_ACTIONS.SET_USER_ID,
      userID: authID
    });
    
    this.getUserData(authID);
  }

  //Set AuthID in database
  private setAuthID(authID: string, data: Object) {
    this.http.post(this.userUrl + authID, data)
      .subscribe(
        (response) => console.log(response)
      )
  }

  private getUserData(authID: string) {
     this.http.get(this.userUrl + authID)
      .subscribe (
        (response) => console.log(response)
      )
  }

}
