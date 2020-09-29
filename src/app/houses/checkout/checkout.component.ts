import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {BillService} from '../../services/bill.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {ToastrService} from 'ngx-toastr';


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

  bill = {
    totalPrice: '',
    checkIn: '',
    checkOut: '',
    status: '',
    order: '',
    description: '',
    customer_id: '',
    house_id: ''
  };

  formCheckout: FormGroup;
  userLogin;
  formDetail;
  fullName;
  phone;
  email;
  Adults = '1 Adults';
  totalPrice;
  showPirce = 1500;

  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private billService: BillService,
              private fb: FormBuilder,
              private authService: AuthService,
              private dataService: DataService,
              private toast: ToastrService) { }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    const userLogin = this.authService.getUserLogin();
    console.log(userLogin);
    this.formCheckout = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      order: ['', Validators.required],
      description: ['']
    });
    this.getHouse();
    this.dataService.dataShare.subscribe(result => {
      this.formDetail = result;

    });
  }

  // tslint:disable-next-line:typedef
  getHouse() {
    const user = this.authService.getUserLogin();
    this.houseService.getHouseId(this.id).subscribe(data => {
      this.house = data;
      // @ts-ignore
      this.customerService.getCustomerById(user.id).subscribe(result => {
        // @ts-ignore
        this.customer = result.user;
        this.fullName = this.customer.username;
        this.phone = this.customer.phone;
        this.email = this.customer.email;
      });
    });
  }
  getCheckin()
  {
    return this.formCheckout.get('checkIn');
  }
  getCheckout()
  {
    return this.formCheckout.get('checkOut');
  }
  get order()
  {
    return this.formCheckout.get('order');
  }

  addBill(): any {
    console.log(this.formCheckout.value);
    this.userLogin = this.authService.getUserLogin();
    console.log(this.formCheckout.value.checkIn);
    this.bill.checkIn = this.formCheckout.value.checkIn;
    this.bill.checkOut = this.formCheckout.value.checkOut;
    this.bill.order = this.formCheckout.value.order;
    this.bill.customer_id = this.userLogin.id;
    // @ts-ignore
    this.bill.house_id = this.house.id;
    const checkIn = new Date(this.formCheckout.value.checkIn);

    const checkOut = new Date(this.formCheckout.value.checkOut);

    const result = this.caculatePrice(checkIn, checkOut);
    // @ts-ignore
    this.bill.totalPrice = result * this.house.price;
    // @ts-ignore
    this.totalPrice = result * this.house.price;
    console.log(this.bill);
    this.bill.status = 'pending';
    this.bill.order = this.formCheckout.value.order;
    this.bill.description = this.formCheckout.value.description;
    console.log(this.bill);
    this.billService.addBill(this.bill).subscribe(data => {
    });
    // console.log(this.house);
    this.houseService.updateStatus(+this.house.id, this.house).subscribe(page => {
      this.router.navigate(['/home']);
      this.showSuccess();
    });

  }

  // tslint:disable-next-line:typedef
  caculatePrice(checkIn, checkOut)
  {
    const dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let result = 0;
    // tslint:disable-next-line:triple-equals
    if (checkIn.getFullYear() == checkOut.getFullYear())
    {
      // tslint:disable-next-line:triple-equals
      if (checkIn.getMonth() == checkOut.getMonth())
      {
        result = result + checkOut.getDate() - checkIn.getDate();
        return result;
      }
      else {
        if (checkOut.getMonth() - checkIn.getMonth() == 1)
        {
          result = result + checkOut.getDate() + dayOfMonth[checkIn.getMonth()] - checkIn.getDate();
          return  result;
        }
        else {
          const countMonth = checkOut.getMonth() - checkIn.getMonth();
          for (let i = 1; i < countMonth; i++)
          {
            result += dayOfMonth[checkIn.getMonth() + i];
          }
          result = result + checkOut.getDate() + dayOfMonth[checkIn.getMonth()] - checkIn.getDate();
          return result;
        }
      }
    }
  }
  showSuccess()
  {
    this.toast.success('Checkout Success!!', 'Alert');
  }

}
