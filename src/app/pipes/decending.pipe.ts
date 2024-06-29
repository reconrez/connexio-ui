import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decending',
  standalone: true
})
export class DecendingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
