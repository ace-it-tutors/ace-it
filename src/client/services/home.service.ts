import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class HomeService {
  constructor (private http: Http) {}

  getUsers (): Observable<any> {
    return this.http.get('/api/users')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getSubjects (): Observable<any> {
    return this.http.get('/api/subject')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getTeaching (subjectID): Observable<any> {
    return this.http.get('/api/subject/' + subjectID)
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
