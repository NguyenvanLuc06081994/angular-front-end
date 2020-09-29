import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICustomer} from '../interfaces/icustomer';
import {environment} from '../../environments/environment';
import {HttpBaseService} from './http-base.service';

@Injectable({
  providedIn: 'root'
})

export class CustomerService extends HttpBaseService {


  constructor(private http: HttpClient) {
    super();
  }

  // tslint:disable-next-line:typedef


  register(customer) {
    return this.http.post(environment.url + '/register', customer, {headers: this.getHeaders()});

  }

  // tslint:disable-next-line:typedef
  getAllCustomers(): Observable<any> {
    return this.http.get<any>(environment.url + '/customers', {headers: this.getHeaders()});
  }

  // tslint:disable-next-line:typedef
  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(environment.url + '/customers' + '/' + id, {headers: this.getHeaders()});
  }

  changeProfile(id: number, data): Observable<any> {
    return this.http.put(environment.url + '/customers' + '/' + id, data, {headers: this.getHeaders()});
  }

  changePassword(id: number, data): Observable<any> {
    return this.http.post(environment.url + '/changePassword' + '/' + id, data, {headers: this.getHeaders()});
  }


}
