import { FilterPipe } from './utilities/filter.pipe';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { RentsComponent } from './rents/rents.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DataTablesModule} from 'angular-datatables';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UnitsComponent } from './units/units.component';
import { PropertiesComponent } from './properties/properties.component';
import { LeasesComponent } from './leases/leases.component';
import { StatementsComponent } from './statements/statements.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Error500Component } from './error500/error500.component';
import { AgedComponent } from './aged/aged.component';
import { MaterialsModule } from './modules/materials.module';
import { HotTableModule } from '@handsontable/angular';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UnitsComponent,
    PropertiesComponent,
    LeasesComponent,
    StatementsComponent,
    HeaderComponent,
    LoginComponent,
    PageNotFoundComponent,
    FooterComponent,
    Error500Component,
    StatementsComponent,
    RentsComponent,
    AgedComponent,
    PropertyDetailsComponent,
    FilterPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialsModule,
    DataTablesModule,
    HotTableModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
