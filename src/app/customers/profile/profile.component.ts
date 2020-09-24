import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userLogin;
  profileForm: FormGroup;
  user;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private active: ActivatedRoute,
              private route: Router,
              private CustomerService: CustomerService,
              private toast: ToastrService) {
  }
id = +this.active.snapshot.paramMap.get('id');
  ngOnInit(): void {
   this.CustomerService.getCustomerById(this.id).subscribe(data =>{
     // @ts-ignore
     this.userLogin = data.user;
     console.log(data);
     this.profileForm = this.fb.group({
       username: [this.userLogin.username],
       phone: [this.userLogin.phone],
       address: [this.userLogin.address],
       // password: ['', [Validators.required, Validators.minLength(6)]],
       // confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
     });
   });
   this.user = this.authService.getUserLogin();

  }
// , {validator: this.comparePassword}
  change() {
    console.log(this.profileForm.value);
    this.CustomerService.changeProfile(this.id, this.profileForm.value).subscribe(data => {
      this.route.navigate(['home']);
    });
    this.toast.success('Change Your Profile Success');
  }

  comparePassword(group: FormGroup) {
    let pass: string;
    pass = group.get('password').value;
    let confirmPass: string;
    confirmPass = group.get('confirmPassword').value;

    return (pass === confirmPass) ? null : {notSame: true};
  }

  get password() {
    return this.profileForm.get('password');
  }

  // tslint:disable-next-line:typedef
  // get confirmPassword() {
  //   return this.profileForm.get('confirmPassword');
  // }
}
