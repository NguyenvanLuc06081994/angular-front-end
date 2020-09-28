import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../services/house.service";
import {Router} from "@angular/router";
import {ImageService} from "../../services/image.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userListHouse;
  userLogin;

  constructor(private houseService: HouseService,
              private router: Router,
              private imageService: ImageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userLogin = this.authService.getUserLogin();
    this.houseService.getHouseByCustomerId(this.userLogin.id).subscribe(data =>{
      this.userListHouse = data;
    });

  }



}
