import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpBaseService} from './http-base.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService extends HttpBaseService {

  constructor(private http: HttpClient) {
    super();
  }

  addBill(data): Observable<any> {
    return this.http.post<Observable<any>>(environment.url + '/bills', data, {headers: this.getHeaders()});
  }
}
