import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';
import {HouseService} from '../../services/house.service';
import {CustomerService} from '../../services/customer.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;
  userLoginCurrent;
  houses;

  constructor(private router: Router,
              private authService: AuthService,
              private houseService: HouseService,
              private customerService: CustomerService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUserLogin();
    console.log(this.user.id);
    this.customerService.getCustomerById(this.user.id).subscribe(data => {
      // @ts-ignore
      this.userLoginCurrent = data;
      console.log(this.userLoginCurrent);
    });
    this.houseService.getAllHouse().subscribe(data => {
      this.houses = data;
    });
  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    this.router.navigate(['login']);
    this.toast.success('logout success');
  }

}
