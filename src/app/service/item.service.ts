import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {retry, catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import Item from "../model/Item";

import PageAndSortResponse from "../model/PageAndSortResponse";


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  apiUrl = environment.apiUrl + '/item';
  qrAPI = environment.qrApi;
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(endPoint) {
    return this.httpClient.get(this.apiUrl + '/' + endPoint).pipe(catchError(this.handleError));
  }
  public getQRImages(endPoint) {
    return this.httpClient.get(this.qrAPI + '/' + endPoint).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  getAllItems(pageAndSort: any): Observable<PageAndSortResponse> {
    return this.httpClient.get<PageAndSortResponse>(
      this.apiUrl,
      {
        params: new HttpParams()
          .set('direction', 'DESC')
          .set('page', pageAndSort.pageIndex)
          .set('size', pageAndSort.pageSize)
          .set('sortBy', 'itemId,color')
      });
  }

  createItem(item: Item) {
    return this.httpClient.post<Item>(this.apiUrl, item);
  }

  updateItem(item: Item) {
    return this.httpClient.put<Item>(this.apiUrl + '/' + item.id, item);
  }

  uploadFile(file: File, itemId: String):Observable<HttpEvent<{}>> {

    let uploadURL = this.apiUrl + '/image/' + itemId;
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', uploadURL, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpClient.request(newRequest);
  }

}
