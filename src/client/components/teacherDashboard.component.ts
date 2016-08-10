import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';

@Component({
  selector: 'teacher-dashboard',
  providers: [ ],
  template: `
  <h3>OMG I AM THE TEACHER DASHBOARD!</h3>
  `
})
export class TeacherDashboardComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>) { }
}
/*
 <label for="subject" *ngIf="isTeacherSelected" >
   What subject do you teach?</label>
  <span tags ngControl='model.teachingSubjects' 
  model='model.teachingSubjects' 
  ng-change="model.teachingSubjects = " *ngIf="isTeacherSelected" ></span>
*/
