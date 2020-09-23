import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../interfaces/ihouse';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {ICustomer} from '../../interfaces/icustomer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  house = {
    id: '',
    name: '',
    type_house: '',
    type_room: '',
    address: '',
    bedroom: '',
    bathroom: '',
    description: '',
    status: '',
    price: '',
    image: '',
    customer_id: ''
  };
  customer: any = {
    username: ''
  };

  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService) {

  }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getHouse();
  }

  // tslint:disable-next-line:typedef
  getHouse() {
    this.houseService.getHouseId(this.id).subscribe(data => {
      console.log(data);
      this.house = data;
      // @ts-ignore
      this.customerService.getCustomerById(this.house.customer_id).subscribe(result => {
        // @ts-ignore
        this.customer = result.user;
        console.log(this.customer);
      });
    });

  }

}
