import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { StudentDashboardService } from '../services/studentDashboard.service.ts';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'student-dashboard',
  providers: [ StudentDashboardService ],
  styles: [`
    .subject {
      background-color: lightblue;
      width: 40%;
      margin: 5px;
      padding: 5px;
    }
  `],
  template: require('./studentDashboard.component.html')
})
export class StudentDashboardComponent {
  date2 = '2016-08-09';
  subjects = [];
  studentID = '';


@select(['login', 'userID']) userID$: Observable<string>;
  userID: string;

  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private studentDashboardService: StudentDashboardService) {
      this.userID$.subscribe(
        userID => this.studentID = userID
      );
     }

    getSubjectByStudent() {
      this.studentDashboardService.findSubjectsByUser(this.studentID)
        .subscribe(
          data => this.subjects = data
        );
    }

    deleteStudentSubject(subjectid, index) {
      this.subjects.splice(index, 1);
      this.studentDashboardService.deleteStudentSubject(this.studentID, subjectid);
    }

}
