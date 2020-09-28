import { Component, OnInit } from '@angular/core';
import {HouseService} from "../../services/house.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  house;
  updateFormHouse: FormGroup;
  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private fb: FormBuilder,
              private toast: ToastrService) {

  }
  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.updateFormHouse = this.fb.group({
      name : ['', [Validators.maxLength(120), Validators.minLength(2), Validators.required]],
      address: ['', [Validators.required,  Validators.maxLength(250)]],
      type_house: ['',Validators.required],
      type_room: ['',Validators.required],
      bedroom: ['', [Validators.required, Validators.min(1)]],
      bathroom: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      status: ['',Validators.required],
      price: ['', [Validators.required]],
    });
    this.houseService.getHouseId(this.id).subscribe(data=>{
      this.house = data;
      this.updateFormHouse.patchValue(this.house);
    })
  }

  updateHouse()
  {
    const house = this.updateFormHouse.value;
    this.houseService.updateHouse(this.id,house).subscribe(res =>{
      this.router.navigate(['/home/userList']);

    });
    this.toast.success('Update House Success!!','Alert');
  }

  back()
  {
    this.router.navigate(['/home/userList']);
  }
  get name()
  {
    return this.updateFormHouse.get('name');
  }

  get typeHouse()
  {
    return this.updateFormHouse.get('type_house');
  }

  get typeRoom()
  {
    return this.updateFormHouse.get('type_room');
  }

  get address()
  {
    return this.updateFormHouse.get('address');
  }

  get bedroom()
  {
    return this.updateFormHouse.get('bedroom');
  }

  get bathroom()
  {
    return this.updateFormHouse.get('bathroom');
  }

  get price()
  {
    return this.updateFormHouse.get('price');
  }

  get status()
  {
    return this.updateFormHouse.get('status');
  }

  get description()
  {
    return this.updateFormHouse.get('description');
  }

}
