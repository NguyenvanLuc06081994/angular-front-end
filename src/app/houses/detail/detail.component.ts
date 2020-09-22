import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../interfaces/ihouse';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {ICustomer} from '../../interfaces/icustomer';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BillService} from '../../services/bill.service';
import {AuthService} from '../../services/auth.service';
import {IBill} from '../../interfaces/ibill';

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
  formBill: FormGroup;
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

  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private billService: BillService,
              private fb: FormBuilder,
              private authService: AuthService) {

  }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.formBill = this.fb.group({
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

  addBill(): any {
    console.log(this.formBill.value);
    const userLogin = this.authService.getUserLogin();
    console.log(this.formBill.value.checkIn);
    this.bill.checkIn = this.formBill.value.checkIn;
    this.bill.checkOut = this.formBill.value.checkOut;
    this.bill.order = this.formBill.value.order;
    this.bill.customer_id = this.customer.id;
    // @ts-ignore
    this.bill.house_id = this.house.id;
    const checkIn = new Date(`"${this.formBill.value.checkIn}"`);
    const getDateCheckIn = checkIn.getDate();
    const checkOut = new Date(`"${this.formBill.value.checkOut}"`);
    const getDateCheckOut = checkOut.getDate();
    const result = getDateCheckOut - getDateCheckIn;
    // @ts-ignore
    this.bill.totalPrice = result * this.house.price;
    console.log(this.bill);
    this.bill.status = 'pending';
    this.house.status = 'dang cho thue';
    this.billService.addBill(this.bill).subscribe(data => {
    });
    console.log(this.house);
    this.houseService.updateStatus(+this.house.id, this.house).subscribe(page => {
      this.router.navigate(['/home']);
    });
  }

}
