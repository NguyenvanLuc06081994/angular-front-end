// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

// @ts-ignore
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$';
  phonePattern = '^((\\0))?[0-9]{9}$';
  data: any;
  public url = 'http://127.0.0.1:8000/api/customers';

  constructor(private registerService: CustomerService,
              private reactive: ReactiveFormsModule,
              private router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private storage: AngularFireStorage) {
  }

  // @ts-ignore

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.maxLength(30), Validators.minLength(6), Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern), Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      inputFile: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  get username() {
    return this.registerForm.get('username');
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.registerForm.get('email');
  }

  // tslint:disable-next-line:typedef
  get phone() {
    return this.registerForm.get('phone');
  }

  // tslint:disable-next-line:typedef
  get address() {
    return this.registerForm.get('address');
  }

  // tslint:disable-next-line:typedef
  get inputFile() {
    return this.registerForm.get('inputFile');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.registerForm.get('password');
  }


  // tslint:disable-next-line:typedef

  downloadURL: string = '';

  // tslint:disable-next-line:typedef
  upload(event) {
    const file = event.target.files[0];
    let filePath = file.name;
    let fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        url => {
          this.downloadURL = url;
          this.registerForm.value.inputFile = url;
        }))
    )
      .subscribe();
  }

  // tslint:disable-next-line:typedef
  register() {
    this.registerService.register(this.registerForm.value).subscribe(data => {
      this.router.navigate(['login']);
    });
  }
}
