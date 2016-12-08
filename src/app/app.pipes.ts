import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'transformdate'
})

export class TransformDatePipe implements PipeTransform {
    transform(value: string): string {
        return moment(value).locale('de').format('Do MMMM, h:mm') + ' Uhr';
    }

}
