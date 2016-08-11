import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class StudentDashboardService {
  constructor(
      private http: Http
    ) {}

  getSubjects() {
    return this.http.get('/api/subject')
      .map(this.extractData)
      .catch(this.handleError);
  }

  findSubjectsByUser(id) {
    return this.http.get('/api/learning/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteStudentSubject(studentID, subjectID) {
    var deleteUrl = '/api/learning/' + studentID + '/' + subjectID;
    console.log(deleteUrl);
    return this.http.delete(deleteUrl);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('BODY', body.data);
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
