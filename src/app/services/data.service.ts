import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
// @ts-ignore
import any = jasmine.any;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // @ts-ignore
  dataSource  = new BehaviorSubject<any>();
  dataShare = this.dataSource.asObservable();

  constructor() {
  }

  addData(data): any {
    this.dataSource.next(data);
  }

}
