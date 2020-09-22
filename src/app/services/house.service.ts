import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IHouse} from '../interfaces/ihouse';
import {CustomerService} from './customer.service';
import {LoginService} from './login.service';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {HttpBaseService} from './http-base.service';


@Injectable({
  providedIn: 'root'
})
export class HouseService extends HttpBaseService {

  token = this.authService.getJWTToken();

  constructor(private http: HttpClient,
              private authService: AuthService) {
    super();
  }

  getAllHouse(): Observable<any> {
    return this.http.get<any>(environment.url + '/houses', {headers: this.getHeaders()});
  }

  addHouse(house: Partial<IHouse>): Observable<any> {
    return this.http.post<IHouse>(environment.url + '/houses', house, {headers: this.getHeaders()});
  }

  getHouseId(id: number): Observable<any> {
    return this.http.get<any>(environment.url + '/houses' + '/' + id, {headers: this.getHeaders()});
  }

  updateStatus(id: number, status): Observable<any> {
    return this.http.put<any>(environment.url + '/houses' + '/' + id, status, {headers: this.getHeaders()});
  }
}
