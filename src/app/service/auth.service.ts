import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {any} from "codelyzer/util/function";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: string;
  public password: string;
  USER_NAME_SESSION_ATTRIBUTE_USER = 'authenticatedUser';
  USER_NAME_SESSION_ATTRIBUTE_TIME = 'authenticatedTime';
  private apiUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {
  }

  authenticationService(username: string, password: string) {

    const headers = {'content-type': 'application/json'};
    const requestBody = {email: username, password: password};
    console.log();
    const body = JSON.stringify(requestBody);

    console.log('body::' + body);
    return this.http.post<any>(this.apiUrl + '/signin', body, {'headers': headers}).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    console.log('came session storage');
    console.log(username);
    console.log(password);
    localStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_USER, username);
    localStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_TIME, String(new Date().getTime()));
  }

  logout() {
    localStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_USER);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    const hours = 0.20;
    const savedTime = Number(localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_TIME));
    console.log('savedTime::' + savedTime);
    const currentTime = new Date().getTime();
    console.log('currentTime::' + currentTime);
    console.log(Number(currentTime) - Number(savedTime));
    console.log('hour time::' + (hours * 60 * 60 * 1000));
    const diff = currentTime - Number(savedTime);
    console.log('Diff::' + diff);
    const maxTime = Number(hours * 60 * 60 * 1000);
    if (savedTime && (diff > maxTime)) {
      localStorage.clear();
    }
    const user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_USER);
    if (user === null) {
      return false;
    }

    return true;
  }

  getLoggedInUserName() {
    const user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_USER);
    if (user === null) {
      return '';
    }
    return user;
  }
}
