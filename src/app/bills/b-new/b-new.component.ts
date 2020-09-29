import { Component, OnInit } from '@angular/core';
import {BillService} from "../../services/bill.service";
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {CustomerService} from "../../services/customer.service";
import {IBill} from "../../interfaces/ibill";
import {ICustomer} from "../../interfaces/icustomer";
import {IHouse} from "../../interfaces/ihouse";
import {ToastrService} from "ngx-toastr";

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
  billHostNew:IBill[]=[];
  houses;
  customerBook;
  customerOder:ICustomer[]=[];

  todayDate : Date = new Date();




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
    console.log(this.userLogin);
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
    });
  }

  cancelBillOrder(index)
  {
    let bill = this.billOderNew[index];
    let checkIn = new Date(bill.checkIn);
    console.log(checkIn.getDate());
    function checkDay(checkIn,todayDate) {
      if(checkIn.getFullYear() == todayDate.getFullYear())
      {
        if(checkIn.getMonth() == todayDate.getMonth())
        {
          if(checkIn.getDate() - todayDate.getDate() <= 1 )
          {
            return false
          }
          else if (checkIn.getMonth() - todayDate.getMonth() ==1)
          {
            let dayOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
            if(checkIn.getDate()-dayOfMonth[checkIn.getMonth()] == 0)
            {
              return false
            }
          }
          else
          {
            return true;
          }
        }
        return true;
      }
      return true;
    }

    if(checkDay(checkIn, this.todayDate))
    {
      if(confirm('Are you sure?'))
      {
        bill.status = 'done';
        this.billService.updateBill(bill,bill.id).subscribe(res=>{
          this.router.navigate(['/home/bills/new']);
        });
        this.toast.success('Cancel Success!', 'Message');
      }

    }
    else {
      this.toast.error('Cannot Cancel!!!','Message');
    }

  }

}
