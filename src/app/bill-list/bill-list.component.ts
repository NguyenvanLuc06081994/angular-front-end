import {Component, OnInit} from '@angular/core';
import {BillService} from '../services/bill.service';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../services/customer.service';
import {HouseService} from '../services/house.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  bills;
  customers;
  houses;

  constructor(private billService: BillService,
              private active: ActivatedRoute,
              private customerService: CustomerService,
              private houseService: HouseService) {
  }

  id = +this.active.snapshot.paramMap.get('id');

  ngOnInit(): void {
    console.log(this.id);
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
      console.log(this.customers);
    });
    this.houseService.getAllHouse().subscribe(data => {
      this.houses = data;
    });
    this.billService.getBillByUserId(this.id).subscribe(data => {
      this.bills = data;
    });
  }

}
