import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()
export class Auth {
  // Configure Auth0
  auth0 = new Auth0({
    domain: 'kylelinhardt.auth0.com',
    clientID: '1fAOoxggMklnQahSLp7O9dYpEZryuprR',
    callbackOnLocationHash: true,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/'
  });

  constructor(private router: Router) {
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      console.log(result);
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public signUp(model, callback) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'code',
      username: model.email,
      password: model.password
    }, function(err, response) {
      if (err) return alert('something went wrong: ' + err.message);
      callback(response);
    });
  };

  public login(username, password, callback) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'code',
      email: username,
      password: password,
    }, function(err, response) {
      if (err) alert("something went wrong: " + err.message);
      callback(response);
    });
  };

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert('something went wrong: ' + err.message);
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}





// @Injectable()
// export class Auth {
//   // Configure Auth0
//   lock = new Auth0Lock('1fAOoxggMklnQahSLp7O9dYpEZryuprR', 'kylelinhardt.auth0.com', {});

//   constructor() {
//     // Add callback for lock `authenticated` event
//     this.lock.on('authenticated', (authResult) => {
//       localStorage.setItem('id_token', authResult.idToken);
//     });
//   }

//   public login() {
//     // Call the show method to display the widget.
//     this.lock.show();
//   };

//   public authenticated() {
//     // Check if there's an unexpired JWT
//     // It searches for an item in localStorage with key == 'id_token'
//     return tokenNotExpired();
//   };

//   public logout() {
//     // Remove token from localStorage
//     localStorage.removeItem('id_token');
//   };
// }
