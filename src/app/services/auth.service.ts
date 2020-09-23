import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }
  getJWTToken(): any {
    return JSON.parse(localStorage.getItem('token'));
  }
  getUserLogin(): object{
    return JSON.parse(localStorage.getItem('userLogin'));
  }
  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
  }

  login(data): Observable<any> {
    return this.http.post(environment.url + '/login', data);
  }
}
