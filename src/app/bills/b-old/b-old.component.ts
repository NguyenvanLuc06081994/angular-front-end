import { Component, OnInit } from '@angular/core';
import {BillService} from "../../services/bill.service";
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {CustomerService} from "../../services/customer.service";
import {IBill} from "../../interfaces/ibill";

@Component({
  selector: 'app-b-old',
  templateUrl: './b-old.component.html',
  styleUrls: ['./b-old.component.css']
})
export class BOldComponent implements OnInit {

  userLogin;
  billOder;
  billOderOld: IBill[] =[];

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
  }

}
