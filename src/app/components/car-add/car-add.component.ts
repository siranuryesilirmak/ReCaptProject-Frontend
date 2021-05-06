import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,FormBuilder, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  constructor( private formBuilder:FormBuilder, private carService:CarService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();

  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      modelYear:["",Validators.required],
    })

  }

  add(){
    if(this.carAddForm.valid){
      let carModel= Object.assign({},this.carAddForm.value) 
      this.carService.add(carModel).subscribe(response=>{
        console.log(response)
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        console.log(responseError.error)
        this.toastrService.error(responseError.error)
        
    })
     

    }else{
      this.toastrService.error("Formunuz eksik.","Dikkat")

    }
   
   
  }

}
