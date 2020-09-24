import {Component, OnInit} from '@angular/core';
import {BillService} from "../../services/bill.service";
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {CustomerService} from "../../services/customer.service";
import {IHouse} from "../../interfaces/ihouse";
import {ICustomer} from "../../interfaces/icustomer";

@Component({
  selector: 'app-b-list',
  templateUrl: './b-list.component.html',
  styleUrls: ['./b-list.component.css']
})
export class BListComponent implements OnInit {
  billOder;
  customersBook;
  houses;
  userLogin;
  bills;
  billHost:IHouse[]=[];
  customerOder:ICustomer[]=[];
  billHouse;


  constructor(private billService: BillService,
              private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private customerService: CustomerService,
              private toast: ToastrService) {
  }

  id = +this.route.snapshot.paramMap.get('id');


  ngOnInit(): void {
    this.userLogin = this.authService.getUserLogin();

    console.log(this.userLogin.id);
    this.billService.getBillByUserId(this.userLogin.id).subscribe(data => {
      this.billOder = data;
      console.log(data);
    });
    this.getHostHouse();
  }

  getHostHouse()
  {
    let count = 0;
    this.houseService.getHouseByCustomerId(this.userLogin.id).subscribe(data => {
      this.houses = data;
      for (let i = 0; i < this.houses.length; i++)
      {
        this.billService.getBillByHouseId(this.houses[i].id).subscribe(house => {
          this.billHouse = house;
          console.log(this.billHouse);
          if (this.billHouse != 0) {
            // @ts-ignore
            this.billHost[count] = this.billHouse[0];
            this.customerService.getCustomerById(this.billHost[count].customer_id).subscribe(customer=>{
              this.customersBook = customer;
              console.log(this.customersBook);
              this.customerOder[count] = this.customersBook['user'];
            });
            count++;
          }
        });
      }
      console.log(this.billHost);
      console.log(this.customerOder);


    });

  }


}
