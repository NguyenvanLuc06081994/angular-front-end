import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoginCurrent;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
 

    this.userLoginCurrent = this.authService.getUserLogin();

  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    this.router.navigate(['login']);
  }

}
