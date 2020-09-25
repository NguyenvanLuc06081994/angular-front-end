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
import {IBill} from "../../interfaces/ibill";

@Component({
  selector: 'app-b-list',
  templateUrl: './b-list.component.html',
  styleUrls: ['./b-list.component.css']
})
export class BListComponent implements OnInit {
  billOder;
  customerBook;
  houses;
  userLogin;
  bills;
  billHost:IHouse[]=[];
  customerOder:ICustomer[]=[];
  billHouse;
  billOderNew: IBill[] =[];


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
    // this.userLogin = this.authService.getUserLogin();
    // console.log(this.userLogin.id);
    // this.billService.getBillByUserId(this.userLogin.id).subscribe(data => {
    //   this.billOder = data;
    //   console.log(this.billOder);
    //   for(let i =0;i<this.billOder.length;i++)
    //   {
    //     if(this.billOder[i].status == 'pending')
    //     {
    //       this.billOderNew.push(this.billOder[i]);
    //     }
    //   }
    //
    // });
    // this.getHostHouse();
  }

  // getHostHouse()
  // {
  //   this.houseService.getHouseByCustomerId(this.userLogin.id).subscribe(data => {
  //     this.houses = data;
  //     for (let i = 0; i < this.houses.length; i++)
  //     {
  //       this.billService.getBillByHouseId(this.houses[i].id).subscribe(house => {
  //         this.billHouse = house;
  //         console.log(this.billHouse);
  //         if (this.billHouse != 0) {
  //           // @ts-ignore
  //           this.billHost.push(this.billHouse[0]);
  //
  //           this.customerService.getCustomerById(this.billHouse[0].customer_id).subscribe(customer=>{
  //             this.customerBook = customer;
  //             this.customerOder.push(this.customerBook['user']) ;
  //
  //           });
  //
  //         }
  //       });
  //     }
  //     console.log(this.billHost);
  //     console.log(this.customerOder);
  //   });
  // }


}
