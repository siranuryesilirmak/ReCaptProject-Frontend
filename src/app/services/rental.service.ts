import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { RentalDetail } from '../models/rentalDetail';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44361/api/"

  constructor(private httpClient:HttpClient) { }
  
  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl +"rentals/getbyrentaldetails"

    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  
  }
  getRentalsByCustomer(customerId:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl +"rentals/getbyrentaldetail?id="+customerId
    
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  
  }

  getRentalCarControl(carId: number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/getcarcontrol?carId="+carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
  addRental(rental: RentalDetail) {
    let newPath = this.apiUrl + 'rentals/add';
    this.httpClient.post(newPath, rental).subscribe();
  }
  checkRentalDates(rental:RentalDetail):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'rentals/checkdates';
    console.log("cservvice",rental)
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
