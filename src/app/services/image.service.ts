import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {ImagePayload} from '../model/images/image.component';
import {HttpBaseService} from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends HttpBaseService {

  constructor(private http: HttpClient) {
    super();
  }

  addHouseImage(data): Observable<any> {
    return this.http.post(environment.url + '/images', data, {headers: this.getHeaders()});
  }

  getImageHouse(id): Observable<any> {
    return this.http.get(environment.url + '/images/' + id, {headers: this.getHeaders()});
  }

  getAllImages(): Observable<any> {
    return this.http.get(environment.url + '/images', {headers: this.getHeaders()});
  }

  getOneImage(): Observable<any> {
    return this.http.get(environment.url + '/imageByHouseId', {headers: this.getHeaders()});
  }
}
