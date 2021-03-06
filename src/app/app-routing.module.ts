import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { LoginComponent } from './components/login/login.component';

import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"carDetails",component:CarDetailComponent},
  {path:"cars/cardetail",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"rentals/getbyrentaldetails",component:RentalComponent},
  {path:"cars/brand/:brandid",component:CarComponent},
  {path:"cars/color/:colorid",component:CarComponent},
  {path:"cars/brand/:brandid/color/:colorid",component:CarComponent},

  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  {path:"car/:id",component:CarDetailComponent},
  {path:"rentals/customer/:customerid",component:RentalComponent},
  

  {path:"cars/filter/brand/:brandId",component:CarComponent},
  {path:"cars/filter/color/:colorId",component:CarComponent},
  {path:"cars/filter/brand/:brandId/color/:colorId",component:CarComponent},

  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
