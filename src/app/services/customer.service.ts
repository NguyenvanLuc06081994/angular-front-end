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
  getAllCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(environment.url + '/customers', {headers: this.getHeaders()});
  }

  // tslint:disable-next-line:typedef
  getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(environment.url + '/customers' + '/' + id, {headers: this.getHeaders()});
  }


}
