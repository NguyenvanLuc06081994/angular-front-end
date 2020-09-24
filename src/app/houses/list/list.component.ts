import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../interfaces/ihouse';
import {HouseService} from '../../services/house.service';
import {Router} from '@angular/router';
import {HttpEvent} from '@angular/common/http';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // @ts-ignore
  listHouse = [];
  images;
  image;

  constructor(private houseService: HouseService,
              private router: Router,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.houseService.getAllHouse().subscribe(
      data => {
        this.listHouse = data;
      })
    this.imageService.getAllImages().subscribe(data => {
      this.images = data;
      this.image = this.images[0].ref
    });


  }

  // tslint:disable-next-line:typedef
  detail() {
    return this.router.navigate(['home/detail']);
  }

  // tslint:disable-next-line:typedef
  getListHouse() {

  }


}
