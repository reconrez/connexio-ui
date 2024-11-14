import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comments',
  standalone: true
})
export class CommentsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (Array.isArray(value)) {
      return value.slice(0, 5);
    }
    return null;
  }

}
