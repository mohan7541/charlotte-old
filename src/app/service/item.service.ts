import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Edge} from "../model/Edge";
import Item from "../model/Item";


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  apiUrl = environment.apiUrl + '/item';
  qrAPI = environment.qrApi;
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


  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.apiUrl);
  }

  createItem(item: Item) {
    return this.httpClient.post<Item>(this.apiUrl, item);
  }

  updateItem(item: Item) {
    return this.httpClient.put<Item>(this.apiUrl + '/' + item.id, item);
  }
}
