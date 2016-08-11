import { Component, Input } from '@angular/core';
import { NgForm }    from '@angular/common';
import { User }    from './user';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewUserService } from '../../services/new-user-service.component';
import { IAppState } from '../../store';
import { Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'user-form',
  providers: [ NewUserService ],
  template: require('./user-form.component.html'),
  styles: [`
    .error {
      color: #FF0000;
    }
  `],
  directives: []
})
export class UserFormComponent {

  constructor(
    private newUserService: NewUserService,
    private router: Router,
    private auth: Auth
  ) { }

  create(dataObj) {
    this.newUserService.createUser(dataObj)
    .subscribe(
      response => {
        console.log("response from sign up", response);
        this.router.navigate(['/login'])
      },
      error => console.log('error', error)
    );
  }

  signUp(model) {
    this.auth.signUp(model, (response) => {
      model.authid = response.idTokenPayload.sub;
      response.accessToken ? this.create(model) : console.log("Auth0 failed", response);
    });
  }

  onSubmit() { this.submitted = true; }

  model = new User('', '', '');
  submitted = false;
  validPasswords = false;
  validEmail = false;

}
