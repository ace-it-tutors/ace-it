import { Component }          from '@angular/core';
import { NgRedux }            from 'ng2-redux';
import { IAppState }          from '../store/index';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Auth }               from '../services/auth.service';
import { LogoutActions }      from '../actions/logout.actions';


@Component({
  selector: 'menu-bar',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ LogoutActions ],
  template: `
  <nav>
    <a routerLink="/home" routerLinkActive="active">Home</a>
    <a routerLink="/student-dash" routerLinkActive="active">Student Dashboard</a>
    <a routerLink="/teacher-dash" routerLinkActive="active">Teacher Dashboard</a>
    <a routerLink="/advanced-search" routerLinkActive="active">Advanced Search</a>
    <a routerLink="/login" routerLinkActive="active">Log In</a>
    <a routerLink="#" routerLinkActive="active" (click)="logout()">Log Out</a>
  </nav>
  `
})
export class MenuBarComponent {
  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private logoutActions: LogoutActions

    ) { }

    logout () {
      this.auth.logout();
      this.logoutActions.setLogoutDispatch();
    }
}
//*ngIf="user-service.isTeacher()"
