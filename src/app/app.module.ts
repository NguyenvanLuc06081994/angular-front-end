// @ts-ignore
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore

import {NgModule} from '@angular/core';
import {LoginComponent} from './customers/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './houses/list/list.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './layouts/home/home.component';
import {RegisterComponent} from './customers/register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './layouts/navbar/navbar.component';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';


import {AddComponent} from './houses/add/add.component';
import {DetailComponent} from './houses/detail/detail.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {BillComponent} from './houses/bill/bill.component';
import { CheckoutComponent } from './houses/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ListComponent,
    AddComponent,
    DetailComponent,
    FooterComponent,
    BillComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule

  ],
  providers: [AngularFirestoreModule, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
}
