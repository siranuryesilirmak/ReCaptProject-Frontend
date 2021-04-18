import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail : CarDetail[]=[] 
  carImages : CarImage[]=[]
  dataLoaded=false
  currentCar:CarDetail;
  


  constructor(private carService:CarService , private activatedRoute : ActivatedRoute , private carImageService:CarImageService) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this. getCarDetailsByCarId(params["carId"]);
        this.getImagesByCarId(params["carId"]);
      } 
    })
    
  }

  getCarDetailsByCarId(carId:number)
  {
    this.carService.getCarDetailsByCarId(carId).subscribe((response)=>{ 
      this.carDetail=response.data
      this.dataLoaded=true
    })
    
  }

  getImagesByCarId(carId:number) {
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data
      this.dataLoaded=true
    })  

  }
}
