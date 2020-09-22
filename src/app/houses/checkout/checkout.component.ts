import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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
              private customerService: CustomerService,
              private route: ActivatedRoute) {
  }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getHouse();
  }

  // tslint:disable-next-line:typedef
  getHouse() {
    this.houseService.getHouseId(this.id).subscribe(data => {
      this.house = data;
      // @ts-ignore
      this.customerService.getCustomerById(this.house.customer_id).subscribe(result => {
        // @ts-ignore
        this.customer = result.user;
      });
    });

  }

}
