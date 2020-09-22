import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$';

  constructor(private loginService: LoginService,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailPattern)]],
      password: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(6)]]
    });
  }

  signIn(): void {
    const value = this.signForm.value;
    this.authService.login(value).subscribe(next => {
      if (next.token) {
        localStorage.setItem('token', JSON.stringify(next.token));
        localStorage.setItem('userLogin', JSON.stringify(next.user));
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  get password(): any {
    return this.signForm.get('password');
  }

  get email(): any {
    return this.signForm.get('email');
  }
}
