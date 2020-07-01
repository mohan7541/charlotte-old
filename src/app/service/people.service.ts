import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import { User } from '../model/User';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  baseUrl = 'http://ec2-13-58-105-249.us-east-2.compute.amazonaws.com:8092/user/';
  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  createUser(user: User) {
    return this.http.post<User>(this.baseUrl + 'create', user);
  }

  updateUser(user: User) {
    return this.http.put<User>(this.baseUrl + user.id, user);
  }
}
