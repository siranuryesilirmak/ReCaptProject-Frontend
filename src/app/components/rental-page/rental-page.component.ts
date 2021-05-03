import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-page',
  templateUrl: './rental-page.component.html',
  styleUrls: ['./rental-page.component.css']
})
export class RentalPageComponent implements OnInit {

  customers:CustomerDetail[];
  customerId:number;
  rentDate: Date;
  returnDate : Date;
  @Input() car : CarDetail={
    brandId:0,
    brandName:"",
    carId:0,
    colorId:0,
    colorName:"",
    dailyPrice:0,
    modelYear:0,
    description:"",
   
  };
  

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private carService:CarService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
    this.activatedRoute.params.subscribe(p=>{
      if(p["carId"]){
        this.getCarsByCarId(p["carId"])
      }
    })
  }

  getCarsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.car=response.data[0];
    })
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
    let MyRental: RentalDetail = {
     
      carId : this.car.carId,
      brandName : this.car.brandName,
      colorName : this.car.colorName,
      customerId : this.customerId,
      rentDate : this.rentDate,
      returnDate : this.returnDate,
      dailyPrice: this.car.dailyPrice,
      description: this.car.description
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