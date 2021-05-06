import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail : CarDetail[]=[];
  carImages : CarImage[]=[]
  dataLoaded=false
  currentCar:CarDetail;
  customers:CustomerDetail[];
  customerId:number;
  rentalId:number;
  rentDate: Date;
  returnDate : Date;
  rentalControl=false;
  rentalMessage="";


  @Input() car : CarDetail={
    carId:0,
    brandId:0,
    colorId:0,
    colorName:"",
    brandName:"",
    dailyPrice:0,
    description:"",
    modelYear:0,
  };

  @Input() customer : Customer={
    customerId:0,
    usersId:0,
    companyName:"",
  };
  

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;


  constructor(
     private carService:CarService ,
     private activatedRoute : ActivatedRoute ,
     private carImageService:CarImageService , 
     private toastrService: ToastrService ,
     private cartService:CartService, 
     private customerService: CustomerService,
     private router: Router,
     private datePipe: DatePipe,
     private rentalService: RentalService,
    ) { }

  ngOnInit(): void { 
    this.getCustomer();
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this. getCarDetailsByCarId(params["carId"]);
        this.getImagesByCarId(params["carId"]);
        this.getCarRentalControl(params["carId"]);
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

  getCarRentalControl(carId:number){
    this.rentalService.getRentalCarControl(carId).subscribe(response=>{
      this.rentalControl=response.success;
       this.rentalMessage=response.message;
    })
  }

  addToCart(carDetail:CarDetail) {
    this.toastrService.success( "Sepete eklendi.");
    this.cartService.addToCart(carDetail);
  }


  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let newDate = new Date();
      newDate.setDate(stringToDate.getDate() + 1);
      return newDate.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
  createRental() {
  this.dataLoaded=true
    let MyRental: RentalDetail = {
    carId : this.car.carId,
    customerId : this.customerId,
    brandName : this.car.brandName,
    colorName : this.car.colorName,
    rentDate : this.rentDate,
    returnDate : this.returnDate,
    dailyPrice : this.car.dailyPrice,
    description : this.car.description,
    
    
    };
    if (MyRental.customerId == undefined || MyRental.rentDate == undefined) {
      this.toastrService.error("Eksik bilgi girdiniz","Bilgilerinizi kontrol edin")
    } else{
      this.router.navigate(['/cars/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz...',
        'Ödeme İşlemleri'
      );
    }
  }
  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }
  getCustomer() {
    this.customerService.getCustomerDetails().subscribe((response) => {
      this.customers = response.data;
      console.log(response.data);
    });
  }

}
