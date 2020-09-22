import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';
import {HouseService} from '../../services/house.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoginCurrent;
  houses;

  constructor(private router: Router,
              private authService: AuthService,
              private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.userLoginCurrent = this.authService.getUserLogin();
    this.houseService.getAllHouse().subscribe(data => {
      this.houses = data;
    });
  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    this.router.navigate(['login']);
  }

}
