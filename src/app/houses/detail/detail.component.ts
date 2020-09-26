import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BillService} from '../../services/bill.service';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {CommentService} from '../../services/comment.service';

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
  comments;
  customers;
  formComment: FormGroup;
  commentAdd = {
    title: '',
    content: '',
    house_id: '',
    user_id: ''
  };

  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private billService: BillService,
              private fb: FormBuilder,
              private authService: AuthService,
              private toast: ToastrService,
              private commentService: CommentService
  ) {

  }

  id = +this.route.snapshot.paramMap.get('id');

  // @ts-ignore
  ngOnInit(private dataService: DataService): void {
    this.detailForm = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      order: ['']
    });

    this.formComment = this.fb.group({
      title: [''],
      content: ['']
    });
    this.getHouse();
    this.commentService.getAll().subscribe(data => {
      this.comments = data;
    });
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
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

  alertNotBook() {
    this.toast.error('You Cannot Book Now!', 'Error');
  }

  booking() {
    if (this.house.status == 'dang cho thue') {
      this.alertNotBook();
    } else {
      this.router.navigate(['/home/checkout/' + this.house.id]);
    }

  }

  addComment() {
    // console.log(this.formComment.value);
    // @ts-ignore
    this.commentAdd.house_id = this.id;
    const userLogin = this.authService.getUserLogin();
    // @ts-ignore
    this.commentAdd.user_id = userLogin.id;
    this.commentAdd.title = this.formComment.value.title;
    this.commentAdd.content = this.formComment.value.content;
    console.log(this.commentAdd);
    this.commentService.add(this.commentAdd).subscribe(data => {
      this.formComment = this.fb.group({
        title: [''],
        content: ['']
      });
      this.commentService.getAll().subscribe(data => {
        this.comments = data;
      });
    });
    this.toast.success('thank you for your comment!');
  }

}
