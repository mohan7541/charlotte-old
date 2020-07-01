import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Edge} from '../model/Edge';

@Injectable({
  providedIn: 'root'
})
export class EdgeService {
  apiUrl = environment.apiUrl + '/edge';

  constructor(private http: HttpClient) {
  }

  getAllEdges(): Observable<Edge[]> {
    return this.http.get<Edge[]>(this.apiUrl);
  }

  createEdge(edge: Edge) {
    return this.http.post<Edge>(this.apiUrl, edge);
  }

  updateEdge(edge: Edge) {
    return this.http.put<Edge>(this.apiUrl + '/' + edge.id, edge);
  }
}
