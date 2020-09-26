import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BillService} from '../../services/bill.service';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {ToastrService} from "ngx-toastr";

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
  detailForm: FormGroup;
  dataService: any;
  userLogin

  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private billService: BillService,
              private fb: FormBuilder,
              private authService: AuthService,
              private toast: ToastrService) {

  }

  id = +this.route.snapshot.paramMap.get('id');

  // @ts-ignore
  ngOnInit(private dataService: DataService): void {
    this.userLogin = this.authService.getUserLogin();
    this.detailForm = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      order: ['']
    });
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

  add(): any {
    const data = this.detailForm.value;
    this.dataService.addData(data);
  }



  booking()
  {
    if(this.house.customer_id == this.userLogin.id)
    {
      this.toast.error('You Cannot Book This House!','Error')

    }
    else
    {
      this.router.navigate(['/home/checkout/' + this.house.id])
    }

  }

}
