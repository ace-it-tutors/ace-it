import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Auth } from '../services/auth.service';
import { HomeComponent } from '../components/home.component';


@Component({
  selector: 'menu-bar',
  directives: [ ROUTER_DIRECTIVES,  ],
  template: `
  <nav>
    <a routerLink="/home" routerLinkActive="active">Home</a>
    <a routerLink="/student-dash" routerLinkActive="active" *ngIf="auth.authenticated()">Student Dashboard</a>
    <a routerLink="/teacher-dash" routerLinkActive="active" >Teacher Dashboard</a>
    <a routerLink="/advanced-search" routerLinkActive="active">Advanced Search</a>
    <a routerLink="/login" routerLinkActive="active" *ngIf="!auth.authenticated()">Log In</a>
    <a routerLink="#" routerLinkActive="active" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</a>
  </nav>
  `
})
export class MenuBarComponent {
  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>
    ) { }
}

//*ngIf="user-service.isTeacher()"