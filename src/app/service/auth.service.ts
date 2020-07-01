import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {any} from "codelyzer/util/function";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: string;
  public password: string;
  private REST_API_SERVER = 'http://ec2-13-58-105-249.us-east-2.compute.amazonaws.com:8092/';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
    constructor(private http: HttpClient) { }

  authenticationService(username: string, password: string) {

    const headers = { 'content-type': 'application/json'};
    const requestBody = {email: username, password: password};
    console.log();
    const body = JSON.stringify(requestBody);

    console.log('body::' + body);
    return this.http.post<any>(this.REST_API_SERVER + 'user/signin', body,{'headers':headers}).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    console.log("came session storage");
    console.log(username);
    console.log(password);
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) {
      return false;
    }
    return true;
  }

  getLoggedInUserName() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) {
      return '';
    }
    return user;
  }
}
