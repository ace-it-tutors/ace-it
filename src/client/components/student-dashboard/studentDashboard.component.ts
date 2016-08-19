import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { Auth } from '../../services/auth.service';
import { StudentDashboardService } from '../../services/studentDashboard.service.ts';
import { Observable } from 'rxjs/Observable';
import { ProfileComponent } from '../profile/profile.component'; 
import { AppointmentComponent } from '../appointments/appointment.component';
import { SubjectSearchComponent } from '../autocomplete/autocomplete.component';
import { ProgressBar, TabView, TabPanel, InputText, Button, Calendar } from 'primeng/primeng';


@Component({
  selector: 'student-dashboard',
  providers: [ StudentDashboardService ],
  directives: [ProfileComponent, AppointmentComponent, SubjectSearchComponent, ProgressBar, TabView, TabPanel, InputText, Button, Calendar],
  template: require('./studentDashboard.component.html'),
  styles: [`
    .subject {
      width: 40%;
      margin: 5px;
      padding: 5px;
      font-family: 'Roboto', sans-serif;
      color: #33495f;
    }
    button {
      color: #33495f;
    }
    button:hover {
      color: #ff9f4f;
      background-color: white;
      cursor: pointer;
    }
    label {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
    }
    .result {
      cursor: pointer;
      border: 1px solid #33495f;
      border-radius: 5px;
      padding: 10px;
      color:  #33495f;
      width: 40%
    }
  `]
})
export class StudentDashboardComponent {
  date2 = '2016-08-09';
  subjects = [];
  studentID: string;



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


    ngOnInit() {
    this.getSubjectByStudent();
    this.getState();
    };
    

    getSubjectByStudent() {
      let authID = this.ngRedux.getState().login['userData'].authid
      this.studentDashboardService.findSubjectsByUser(authID)
        .subscribe(
          data => this.subjects = data
        );
    }

    deleteStudentSubject(subjectid, index) {
      let authID = this.ngRedux.getState().login['userData'].authid
      this.subjects.splice(index, 1);
      this.studentDashboardService.deleteStudentSubject(authID, subjectid)
        .subscribe(
          response => console.log(response)
        );
    }

    levelUp(subjectid, userid, progress) {
      let model = {
        userID: userid,
        subjectID: subjectid
      }
      if(progress <= 90) {  
        this.studentDashboardService.levelUp(model)
          .subscribe(
            response => {
               this.getSubjectByStudent()
               console.log(response)
            }
          )
      }  else {
        alert("You have completed this subject");
      }
      
    }


    getState(){
     console.log(this.ngRedux.getState())
    }    

}
