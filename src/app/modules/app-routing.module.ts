import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { AgedComponent } from '../aged/aged.component';
import { RentsComponent } from '../rents/rents.component';
import { Error500Component } from '../error500/error500.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LeasesComponent } from '../leases/leases.component';
import { PropertiesComponent } from '../properties/properties.component';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UnitsComponent } from '../units/units.component';
import { StatementsComponent } from '../statements/statements.component';
import {ProfileComponent} from '../profile/profile.component';
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'profile', component: ProfileComponent},
  {path: 'properties', component: PropertiesComponent},
  {path: 'details/:id', component: PropertyDetailsComponent},
  {path: 'units/:id', component: UnitsComponent},
  {path: 'leases/:id', component: LeasesComponent},
  {path: 'aged/:id', component: AgedComponent},
  {path: 'paid_statements/:id', component: StatementsComponent},
  {path: 'rents', component: RentsComponent},
  {path: 'error', component: Error500Component},
  {path: '**', component: PageNotFoundComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
