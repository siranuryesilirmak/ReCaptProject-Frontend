import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';


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
}
