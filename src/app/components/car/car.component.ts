import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';


import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[]
  carDetails:CarDetail[]=[]
  carDetail:CarDetail

  colors:Color[];
  brands:Brand[];

  dataLoaded=false
  filterText="";
  brandFilter: Number;
  colorFilter: Number;
 
  
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private _router: Router) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params['colorid'] && params['brandid']) {
        this.getCarsByColorAndBrand( params['brandid'],params['colorid'])
      }else if(params["colorid"]){
        this.getCarsByColor(params["colorid"])
      }else  if(params["brandid"]){
        this.getCarsByBrand(params["brandid"]) } 
     
      this.getCars();
    })
    this.getCars();
    this.getCarDetails();
    

  }

  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.cars=response.data
      this.dataLoaded=true
    })
   
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarDetailsByBrandId(brandId).subscribe((response)=>{
      this.carDetails=response.data
      this.dataLoaded=true
    })
   
  }

  getCarsByColor(colorId:number){
    this.carService.getCarDetailsByColorId(colorId).subscribe((response)=>{
      this.carDetails=response.data
      this.dataLoaded=true
    })
   
  }

  getCarsByColorAndBrand(brandId:number,colorId:number){
    this.carService.getCarDetailsByBrandIdAndColorId(brandId,colorId).subscribe((response)=>{
      this.carDetails=response.data
      this.dataLoaded=true
    })
   
  }

    getCarDetails() {
      this.carService.getCarsDetails().subscribe(response=>{
          this.carDetails=response.data
         this.dataLoaded = true;
         })
    }
  
       getSelectedBrand(id: Number) {
        if (this.brandFilter == id)
          return true;
        else
          return false;
      }
      getSelectedColor(id: Number) {
        if (this.colorFilter == id)
          return true;
        else
          return false;
      }

      getFilter(brandId:Number,colorId:Number){
        this._router.navigate(['/cars/cardetail'], {
          queryParams: { colorId: colorId, brandId: brandId },
        });
      }
      getRouterLink(){
    if(this.brandFilter && this.colorFilter){
      return "/cars/brand/"+this.brandFilter+"/color/"+this.colorFilter;
    }else if(this.brandFilter){
      return "/cars/brand/"+this.brandFilter;
    }else if(this.colorFilter){
      return "/cars/color/"+this.colorFilter;
    }else{
      return "/cars";
    }
  }

  IsCurrentColorNull(){
    if(this.colorFilter){
      return true;
    }else{
      return false;
    }
  }

  IsCurrentBrandNull(){
    if(this.brandFilter){
      return true;
    }else{
      return false;
    }
  }
}
