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

  findSubjectsByUser(authid) {
    return this.http.get('/api/learning/' + authid)
      .map(this.extractData)
      .catch(this.handleError);
  }

  findSubjectsByTeacher(id) {
    return this.http.get('/api/teaching/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteStudentSubject(studentID, subjectID) {
    var deleteUrl = '/api/learning/' + studentID + '/' + subjectID;
    console.log(deleteUrl);
    return this.http.delete(deleteUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addSubjectForStudent(model) {
    return this.http.post('/api/learning', model)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addSubjectForTeacher(model) {
    return this.http.post('/api/teaching', model)
      .map(this.extractData)
      .catch(this.handleError);
  }

  levelUp(model) {
    return this.http.put('/api/learning', model)
      .map(this.extractData)
      .catch(this.handleError)
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
