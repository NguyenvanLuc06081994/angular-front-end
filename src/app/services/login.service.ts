import {Injectable} from '@angular/core';
import {CustomerService} from './customer.service';
import {logger} from 'codelyzer/util/logger';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  result;
  token;
  customer;

  constructor(private customerService: CustomerService,
              private http: HttpClient) {
  }

  findCustomer(data): any {
    // @ts-ignore
    // console.log(this.customerService.getAll());
    // tslint:disable-next-line:no-shadowed-variable
    this.customerService.login(data).subscribe(data => {
      this.result = data;
      this.customer = this.result.user;
      this.token = this.result.token;
      console.log(this.customer);
      localStorage.setItem('userLogin', JSON.stringify(this.customer));
      localStorage.setItem('token', JSON.stringify(this.token));
    });
    return true;
  }

  getCustomer(): any {
    return JSON.parse(localStorage.getItem('customerLogin'));
  }

  loginGoogle(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/redirect/google');
  }

  loginSuccess(): Observable<any> {
    return this.http.get(environment.url + '/callback/google');
  }
}
