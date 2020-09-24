import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  userLogin;
  user;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private active: ActivatedRoute,
              private route: Router,
              private CustomerService: CustomerService,
              private toast: ToastrService) { }
  id = +this.active.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.CustomerService.getCustomerById(this.id).subscribe(data =>{
      // @ts-ignore
      this.userLogin = data.user;
      console.log(data);
      this.passwordForm = this.fb.group({
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
      }, {validator: this.comparePassword});
    });
    this.user = this.authService.getUserLogin();
  }
  updatePassword(){
    this.CustomerService.changePassword(this.id, this.passwordForm.value).subscribe(data=>{
      this.route.navigate(['/home/password', this.id]);
    });
    this.toast.success('Change Your Password Success');
  }
  comparePassword(group: FormGroup) {
    let pass: string;
    pass = group.get('new_password').value;
    let confirmPass: string;
    confirmPass = group.get('confirm_password').value;

    return (pass === confirmPass) ? null : {notSame: true};
  }

  get password() {
    return this.passwordForm.get('new_password');
  }
  get oldPassword() {
    return this.passwordForm.get('old_password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirm_password');
  }

}
