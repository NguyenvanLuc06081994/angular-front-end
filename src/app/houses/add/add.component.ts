import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addHouseForm: FormGroup;
  customerLogin;
  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private loginService: LoginService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.addHouseForm = this.fb.group({
      name : ['', [Validators.maxLength(120), Validators.minLength(6), Validators.required]],
      address: ['', [Validators.required,  Validators.maxLength(250)]],
      type_house: [''],
      type_room: [''],
      bedroom: ['', [Validators.required, Validators.min(1)]],
      bathroom: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(250)]],
      status: [''],
      price: ['', [Validators.required]],
      image: ['']
    });
    this.customerLogin = this.authService.getUserLogin();
  }
  // tslint:disable-next-line:typedef
  addSubmit()
  {
    const house = this.addHouseForm.value;
    house.customer_id = this.customerLogin.id;
    console.log(house);
    this.houseService.addHouse(house).subscribe(data => {
      this.router.navigate(['home/list']);
    });
  }
  downloadURL: string;
  upload(event) {
    const file = event.target.files[0];
    let filePath = file.name;
    let fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        url => {
          this.downloadURL = url;
          this.addHouseForm.value.image = url;
        }))
    )
      .subscribe();
  }
  // tslint:disable-next-line:typedef
  list()
  {
    this.router.navigate(['home']);
  }

  // tslint:disable-next-line:typedef
  get name()
  {
    return this.addHouseForm.get('name');
  }
  // tslint:disable-next-line:typedef
  get address()
  {
    return this.addHouseForm.get('address');
  }
  // tslint:disable-next-line:typedef
  get bedroom()
  {
    return this.addHouseForm.get('bedroom');
  }
  // tslint:disable-next-line:typedef
  get bathroom()
  {
    return this.addHouseForm.get('bathroom');
  }
  // tslint:disable-next-line:typedef
  get price()
  {
    return this.addHouseForm.get('price');
  }
  // tslint:disable-next-line:typedef
  get description()
  {
    return this.addHouseForm.get('description');
  }

}
