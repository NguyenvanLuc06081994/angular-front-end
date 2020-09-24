// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './customers/register/register.component';
import {HomeComponent} from './layouts/home/home.component';
import {LoginComponent} from './customers/login/login.component';
import {ListComponent} from './houses/list/list.component';
import {IsAuthenGuard} from './is-authen.guard';
import {AddComponent} from './houses/add/add.component';
import {DetailComponent} from './houses/detail/detail.component';
import {CheckoutComponent} from './houses/checkout/checkout.component';

import {BListComponent} from "./bills/b-list/b-list.component";


import {ProfileComponent} from './customers/profile/profile.component';
import {PasswordComponent} from './customers/password/password.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: 'password/:id', component: PasswordComponent},
  {path: 'profile/:id', component: ProfileComponent},

  {
    path: 'home',
    children: [
      {path: '', component: HomeComponent},
      {path: 'list', component: ListComponent},
      {path: 'add', component: AddComponent},
      {path: 'detail/:id', component: DetailComponent },
      {path: 'checkout/:id', component: CheckoutComponent },

      {path: 'bills', component: BListComponent},

    ],
    canActivate: [IsAuthenGuard]
  },
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
