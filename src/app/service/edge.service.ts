import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Edge} from '../model/Edge';
import PageAndSortResponse from "../model/PageAndSortResponse";

@Injectable({
  providedIn: 'root'
})
export class EdgeService {
  apiUrl = environment.apiUrl + '/edge';

  constructor(private httpClient: HttpClient) {
  }

  getAllEdges(pageAndSort: any): Observable<PageAndSortResponse> {
    return this.httpClient.get<PageAndSortResponse>(
      this.apiUrl,
      {
        params: new HttpParams()
          .set('direction', 'DESC')
          .set('page', pageAndSort.pageIndex)
          .set('size', pageAndSort.pageSize)
      });
  }
  createEdge(edge: Edge) {
    return this.httpClient.post<Edge>(this.apiUrl, edge);
  }

  updateEdge(edge: Edge) {
    return this.httpClient.put<Edge>(this.apiUrl + '/' + edge.id, edge);
  }
}
