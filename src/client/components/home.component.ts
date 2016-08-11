import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { HomeService } from '../services/home.service';
import { UserService } from '../services/user.service';
import { LoginActions } from '../actions/login.actions';


@Component({
  selector: 'home',
  providers: [ HomeService, LoginActions, UserService ],
  template: `
  <h3>OMG I AM THE HOME!!</h3>
  <h1>Subjects:</h1>
    <ul *ngFor="let subject of subjects">
      <li (click)="getTeaching(subject.id)">
      {{subject.name}}
      </li>
    </ul>
    <div>
      <ul *ngFor="let user of users">
        <li>
          {{user.name}}
        </li>
      </ul>
    </div>
<div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
  
  `
})
export class HomeComponent implements OnInit {
  // Selected observables to test async pipe model. 
  // Members to test subscribe model.
  private users = [];
  private subjects = [];
  private errorMessage: string;

  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private homeService: HomeService,
    private userService: UserService,
    private loginActions: LoginActions
    ) {}
  ngOnInit() {
    this.getSubjects();

    if (localStorage.getItem('authID') !== null) {
      //do google data collections
      let userId = localStorage.getItem('authID');
      //this.loginActions.setAuthDispatch(userID);  
      this.userService.getUserData(userId)
        .subscribe(
          (response) => console.log('response from google getUserService', response)
        );
    } else {
      let userID: string = this.ngRedux.getState()['login']['userID'];
      this.userService.getUserData(userID)
        .subscribe(
          (userData) => {
            this.loginActions.setDataDispatch(userData[0]);
          }
        );
    }
  };

  getUsers() {
    this.homeService.getUsers()
      .subscribe(
        data => this.users = data,
        error =>  this.errorMessage = <any>error);
  }

  getSubjects() {
    this.homeService.getSubjects()
      .subscribe(
        data => this.subjects = data,
        error =>  this.errorMessage = <any>error);
  }

  getTeaching(subjectID) {
    console.log(subjectID);
    this.homeService.getTeaching(subjectID)
        .subscribe(
          data => {
            this.users = data;
            console.log(data);
          },
          error =>  this.errorMessage = <any>error);
  }
}
