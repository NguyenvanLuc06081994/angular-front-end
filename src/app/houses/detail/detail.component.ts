import {Component, OnInit, ViewChild} from '@angular/core';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BillService} from '../../services/bill.service';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';

import {ToastrService} from "ngx-toastr";
import {
  AngularMyDatePickerDirective,
  CalAnimation,
  DefaultView,
  IAngularMyDpOptions,
  IMyMarkedDate
} from "angular-mydatepicker";
import {ImageService} from "../../services/image.service";
import {CommentService} from '../../services/comment.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @ViewChild('dp') mydp: AngularMyDatePickerDirective;
  myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    markCurrentDay: true,
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    minYear: 1971,
    maxYear: 2200,
    showSelectorArrow: true,
    monthSelector: true,
    yearSelector: true,
    satHighlight: false,
    highlightDates: [],
    disableDates: [],
    disableHeaderButtons: true,
    showWeekNumbers: false,
    disableDateRanges: [
      {begin: {year: 2016, month: 10, day: 5}, end: {year: 2016, month: 10, day: 7}},
      {begin: {year: 2016, month: 10, day: 10}, end: {year: 2016, month: 10, day: 12}}
    ],
    disableUntil: {year: 0, month: 0, day: 0},
    disableSince: {year: 0, month: 0, day: 0},
    disableWeekdays: [],
    markDates: [],
    markWeekends: <IMyMarkedDate>{},
    selectorHeight: '266px',
    selectorWidth: '266px',
    closeSelectorOnDateSelect: true,
    closeSelectorOnDocumentClick: true,
    showMonthNumber: true,
    appendSelectorToBody: false,
    focusInputOnDateSelect: true,
    dateRangeDatesDelimiter: " - ",
    defaultView: DefaultView.Date,
    showFooterToday: false,
    calendarAnimation: {in: CalAnimation.None, out: CalAnimation.None},
    rtl: false,
    stylesData:
      {
        selector: '',
        styles: ''
      },
  };
  disableUntil() {
    let d: Date = new Date();
    d.setDate(d.getDate() - 1);
    let copy: IAngularMyDpOptions = this.getCopyOfOptions();
    copy.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.myDatePickerOptions = copy;
    this.mydp.toggleCalendar();

  }

  getCopyOfOptions(): IAngularMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }
  onCalendar(): void {
    return  this.mydp.openCalendar();
  }
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
  imgs ={
    id: '',
    house_id: '',
    ref: ''
  };

  userLogin
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

              private imgService: ImageService) {

              private commentService: CommentService
  ) {


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

    this.formComment = this.fb.group({
      title: [''],
      content: ['']
    });
    this.getHouse();

    this.getImgById();

    this.commentService.getAll().subscribe(data => {
      this.comments = data;
    });
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });

  }

  getImgById(){
    this.imgService.getImageHouse(this.id).subscribe(data =>{
      this.imgs = data;
      console.log(this.imgs);
    });
  }



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


  alertNotBook()
  {
    this.toast.error('You Cannot Book Now!','Error');
  }

  booking()
  {

    if(this.house.status == 'dang cho thue')




  booking()
  {
    if(this.house.customer_id == this.userLogin.id)

    {
      this.toast.error('You Cannot Book This House!','Error')

    }
    else if(this.house.status == 'Đang Sửa Chữa')
    {
      this.toast.error('You Cannot Book This House', 'Error');
    }
    else
    {

      this.router.navigate(['/home/checkout/' + this.house.id])


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
