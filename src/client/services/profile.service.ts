import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProfileService {
  constructor (private http: Http) {}

  updateUser(userData: Object, authID: string) {
    return this.http.put('/api/users/' + authID, userData);
  }

  updateRate(userData){ 
    return this.http.put('/api/teachers/rate', userData)
  }
}
