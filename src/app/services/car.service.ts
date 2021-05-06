import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44361/api/"

  constructor(private httpClient:HttpClient) { }
  
  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl +"cars/getcardetailbybrand?brandId="+brandId
    
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl +"cars/getcardetailbycolor?colorId="+colorId
    
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  
  }

  getCarsDetails():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);

  }

   getCarDetailsByBrandId(brandId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbybrand?brandId="+brandId;
     return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   }

   getCarDetailsByColorId(colorId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbycolor?colorId="+colorId
     return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   }

   getCarDetailsByBrandIdAndColorId(brandId:number, colorId:number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbybrandandcolor?brandId="+brandId +"&colorId="+colorId;
     return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   }

   add(car:Car):Observable<ResponseModel>{
     return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
   }

}
