import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"rentals/getbyrentaldetails",component:RentalComponent},
  {path:"cars/brand/:brandid",component:CarComponent},
  {path:"cars/color/:colorid",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  {path:"car/:id",component:CarDetailComponent},
  {path:"rentals/customer/:customerid",component:RentalComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
