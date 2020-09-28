import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpBaseService} from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends HttpBaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<any> {
    return this.http.get(environment.url + '/comments', {headers: this.getHeaders()});
  }

  add(data): Observable<any> {
    return this.http.post(environment.url + '/comments', data, {headers: this.getHeaders()});
  }
}
