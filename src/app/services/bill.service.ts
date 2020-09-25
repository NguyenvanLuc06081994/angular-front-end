import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpBaseService} from './http-base.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IBill} from "../interfaces/ibill";

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

  getBillByUserId(id: number): Observable<any> {
    return this.http.get(environment.url + '/bills/searchbyci/' + id, {headers: this.getHeaders()});
  }

  getBillByHouseId(id: number): Observable<any>
  {
    return this.http.get(environment.url + '/bills/searchbyhi/' + id, {headers: this.getHeaders()});
  }

  updateBill(bill: IBill, id: number): Observable<IBill>
  {
    return this.http.put<IBill>(environment.url + '/bills/'+id,bill, {headers: this.getHeaders()});
  }


}
