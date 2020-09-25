import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../interfaces/ihouse';
import {HouseService} from '../../services/house.service';
import {Router} from '@angular/router';
import {HttpEvent} from '@angular/common/http';
import {ImageService} from '../../services/image.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  formSearch: FormGroup;

  constructor(private houseService: HouseService,
              private router: Router,
              private imageService: ImageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.houseService.getAllHouse().subscribe(
      data => {
        this.listHouse = data;
      });
    this.imageService.getAllImages().subscribe(data => {
      this.images = data;
      this.image = this.images[0].ref;
    });
    this.formSearch = this.fb.group({
      name: [''],
      address: [''],
      type_house: [''],
      type_room: [''],
      price: [''],
      bedroom: [''],
      bathroom: ['']
    });
  }

  // tslint:disable-next-line:typedef
  detail() {
    return this.router.navigate(['home/detail']);
  }

  // tslint:disable-next-line:typedef
  search() {
    this.houseService.multiSearch(this.formSearch.value).subscribe(data => {
      console.log(data);
      this.listHouse = data;
    });
  }


}
