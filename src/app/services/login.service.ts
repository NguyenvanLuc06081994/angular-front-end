import {Injectable} from '@angular/core';
import {CustomerService} from './customer.service';
import {logger} from 'codelyzer/util/logger';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  result;
  token;
  customer;

  constructor(private customerService: CustomerService) {
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
}
