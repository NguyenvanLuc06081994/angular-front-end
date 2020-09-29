import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {ImageService} from '../../services/image.service';
import {ImagePayload} from '../../model/images/image.component';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private loginService: LoginService,
              private storage: AngularFireStorage,
              private customerService: CustomerService,
              private toast: ToastrService,
              private imageService: ImageService) {
  }

  // tslint:disable-next-line:typedef
  get name() {
    return this.addHouseForm.get('name');
  }

  // tslint:disable-next-line:typedef
  get typeHouse() {
    return this.addHouseForm.get('type_house');
  }

  // tslint:disable-next-line:typedef
  get typeRoom() {
    return this.addHouseForm.get('type_room');
  }

  // tslint:disable-next-line:typedef
  get address() {
    return this.addHouseForm.get('address');
  }

  // tslint:disable-next-line:typedef
  get bedroom() {
    return this.addHouseForm.get('bedroom');
  }

  // tslint:disable-next-line:typedef
  get bathroom() {
    return this.addHouseForm.get('bathroom');
  }

  // tslint:disable-next-line:typedef
  get status() {
    return this.addHouseForm.get('status');
  }

  // tslint:disable-next-line:typedef
  get price() {
    return this.addHouseForm.get('price');
  }

  // tslint:disable-next-line:typedef
  get description() {
    return this.addHouseForm.get('description');
  }

  houseAdd;
  addHouseForm: FormGroup;
  customerLogin;
  downloadURL: string;
  files = [];
  a;

  uploadPercents = [];

  ngOnInit(): void {
    this.addHouseForm = this.fb.group({
      name: ['', [Validators.maxLength(120), Validators.minLength(6), Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      type_house: ['', Validators.required],
      type_room: ['', Validators.required],
      bedroom: ['', [Validators.required, Validators.min(1)]],
      bathroom: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      status: ['', Validators.required],
      price: ['', [Validators.required]],
    });
    this.customerLogin = this.authService.getUserLogin();

  }

  // tslint:disable-next-line:typedef
  addSubmit() {
    const house = this.addHouseForm.value;
    house.customer_id = this.customerLogin.id;

    this.houseService.addHouse(house).subscribe(data => {
      this.houseAdd = data;
      console.log(data);
      for (let i = 0; i < this.files.length; i++) {
        this.upload(i, this.files[i], this.houseAdd.id, this.files.length);
        console.log(1);
      }
      this.router.navigate(['/home/list']);
      this.showSuccess();
    });
  }

  onSelect(event): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload(i: number, file: File, houseId: number, size: number): void {
    const filePath = `houses/${Date.now()}`;
    const task = this.storage.upload(filePath, file);
    const fileRef = this.storage.ref(filePath);
    this.uploadPercents[i] = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        url => {
          const image = new ImagePayload();
          image.house_id = houseId;
          this.downloadURL = url;
          image.ref = url;
          console.log(url);
          this.imageService.addHouseImage(image).subscribe(data => {
            this.a = data;
            console.log(this.a);
            if (i === size - 1) {
              this.router.navigate(['/home/list'], {
                queryParams: {created: 'true'},
              });
            }
          });
        }))
    ).subscribe();


  }


  // tslint:disable-next-line:typedef
  list() {
    this.router.navigate(['home']);
  }

  // tslint:disable-next-line:typedef
  showSuccess() {
    this.toast.success('Add New House Success!!', 'Alert');
  }
}
