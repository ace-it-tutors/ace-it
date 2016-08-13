import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
  userUrl : string = '/api/users/';
  updateUser : string = '/api/users/:authID';
  constructor (private http: Http) {}

  public getUserData(authID: string) {
    console.log('This getUserData function is so hot right now', authID);
    return this.http.get(this.userUrl + authID)
      .map(this.extractData)
      .catch(this.handleError);
  }

   public setUserData(authID: string, userProfile : Object) {
    console.log('setUserData in UserService', arguments);
    return this.http.put(this.updateUser + authID, userProfile)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}