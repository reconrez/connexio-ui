import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decending',
  standalone: true
})
export class DecendingPipe implements PipeTransform {

  transform(arr: string | any[]): string | any[] {
    if (typeof arr === 'string') {
      return arr.split('').reverse().join('');
    } else {
      return arr.slice().reverse();
    }
  }

}
