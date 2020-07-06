import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {User} from '../model/User';
import {Observable} from "rxjs";
import PageAndSortResponse from "../model/PageAndSortResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  baseUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {
  }

  getAllPeople(pageAndSort: any): Observable<PageAndSortResponse> {
    return this.http.get<PageAndSortResponse>(this.baseUrl,
      {
        params: new HttpParams()
          .set('direction', 'DESC')
          .set('page', pageAndSort.pageIndex)
          .set('size', pageAndSort.pageSize)
      });
  }

  createUser(user: User) {
    return this.http.post<User>(this.baseUrl + 'create', user);
  }

  updateUser(user: User) {
    return this.http.put<User>(this.baseUrl + user.id, user);
  }

  uploadFile(file: File, userId: String):Observable<HttpEvent<{}>> {

    let uploadURL = this.baseUrl + '/image/' + userId;
    console.log(uploadURL);
    const data: FormData = new FormData();
    data.append('image', file);
    const newRequest = new HttpRequest('POST', uploadURL, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }
}
