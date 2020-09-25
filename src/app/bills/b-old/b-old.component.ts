import { Component, OnInit } from '@angular/core';
import {BillService} from "../../services/bill.service";
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {CustomerService} from "../../services/customer.service";
import {IBill} from "../../interfaces/ibill";
import {IHouse} from "../../interfaces/ihouse";
import {ICustomer} from "../../interfaces/icustomer";

@Component({
  selector: 'app-b-old',
  templateUrl: './b-old.component.html',
  styleUrls: ['./b-old.component.css']
})
export class BOldComponent implements OnInit {

  userLogin;
  billOder;
  billOderOld: IBill[] =[];
  billHouse;
  billHostOld:IHouse[]=[];
  houses;
  customerBook;
  customerOder:ICustomer[]=[];

  constructor(private billService: BillService,
              private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private customerService: CustomerService) {

  }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.userLogin = this.authService.getUserLogin();
    this.billService.getBillByUserId(this.userLogin.id).subscribe(bills=>{
      this.billOder = bills;
      for(let i =0; i<this.billOder.length;i++)
      {
        if(this.billOder[i].status == 'done')
        {
          this.billOderOld.push(this.billOder[i]);
        }
      }
    });
    this.getHostHouse();
  }

  getHostHouse()
  {
    this.houseService.getHouseByCustomerId(this.userLogin.id).subscribe(data => {
      this.houses = data;
      for (let i = 0; i < this.houses.length; i++)
      {
        this.billService.getBillByHouseId(this.houses[i].id).subscribe(house => {
          this.billHouse = house;
          console.log(this.billHouse);
          if ((this.billHouse != 0)&&(this.billHouse[0].status == 'done')) {
            // @ts-ignore
            this.billHostOld.push(this.billHouse[0]);

            this.customerService.getCustomerById(this.billHouse[0].customer_id).subscribe(customer=>{
              this.customerBook = customer;
              this.customerOder.push(this.customerBook['user']) ;

            });

          }
        });
      }
      console.log(this.billHostOld);
      console.log(this.customerOder);
    });
  }

}
