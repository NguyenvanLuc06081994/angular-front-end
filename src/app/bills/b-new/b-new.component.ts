import { Component, OnInit } from '@angular/core';
import {BillService} from "../../services/bill.service";
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {CustomerService} from "../../services/customer.service";
import {IBill} from "../../interfaces/ibill";
import {ICustomer} from "../../interfaces/icustomer";
import {IHouse} from "../../interfaces/ihouse";

@Component({
  selector: 'app-b-new',
  templateUrl: './b-new.component.html',
  styleUrls: ['./b-new.component.css']
})
export class BNewComponent implements OnInit {

  userLogin;
  billOder;
  billOderNew: IBill[] =[];
  billHouse;
  billHostNew:IHouse[]=[];
  houses;
  customerBook;
  customerOder:ICustomer[]=[];



  constructor(private billService: BillService,
              private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private customerService: CustomerService,) {

  }

  id = +this.route.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.userLogin = this.authService.getUserLogin();
    this.billService.getBillByUserId(this.userLogin.id).subscribe(bills=>{
      this.billOder = bills;
      for(let i =0; i<this.billOder.length;i++)
      {
        if(this.billOder[i].status == 'pending')
        {
          this.billOderNew.push(this.billOder[i]);
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
          if ((this.billHouse != 0)&&(this.billHouse[0].status == 'pending')) {
            // @ts-ignore
            this.billHostNew.push(this.billHouse[0]);

            this.customerService.getCustomerById(this.billHouse[0].customer_id).subscribe(customer=>{
              this.customerBook = customer;
              this.customerOder.push(this.customerBook['user']) ;

            });

          }
        });
      }
      console.log(this.billHostNew);
      console.log(this.customerOder);
    });
  }

}
