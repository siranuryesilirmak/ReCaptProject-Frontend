import { Pipe, PipeTransform } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {
 

    transform(value: CarDetail[], filterText: string): CarDetail[] {
      filterText = filterText?filterText.toLocaleLowerCase():""
      return filterText?value
      .filter((p:CarDetail)=>p.brandName.toLocaleLowerCase().indexOf(filterText)!==-1)
      :value;
    }

}
