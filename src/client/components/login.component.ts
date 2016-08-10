//Should have username and password fields
import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState, } from '../store/index';
import { Auth } from '../services/auth.service';
import { Router,
         ROUTER_DIRECTIVES,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { LoginActions } from '../actions/login.actions';


@Component({
  selector: 'log-in',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ LoginActions ],
  styles: [`
    a {
      color: white;
    }
  `],
  template: `
    <div>
        <div class="row">
          <div class="col-md-6">
            <form>
              <div class="form-group">
                <label for="name">Username</label>
                <input type="text" class="form-control" #username placeholder="yours@example.com">
              </div>
              <div class="form-group">
                <label for="name">Password</label>
                <input type="password" class="form-control" #password placeholder="your password">
              </div>
              <button type="submit" class="btn btn-default" (click)="auth.login(username.value, password.value)">Login</button>
               <button type="submit" class="btn btn-default btn-primary" (click)="auth.googleLogin()">Login with google</button>
              <h4>Don't have an account yet?</h4>
            </form>
            <button type="submit" class="btn btn-default btn-primary">
              <a routerLink="/sign-up" routerLinkActive="active">Sign Up</a>
            </button>
          </div>
        </div>
      </div>
  `
})
export class LoginComponent {

  constructor(
    private auth: Auth,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private actions: LoginActions
    ) { }

    goToSignup() {
      this.router.navigate(['/sign-up']);
    }
}
