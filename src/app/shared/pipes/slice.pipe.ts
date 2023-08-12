import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {
  transform(value: string, maxCharCount: number): string {   

    if (value.length <= maxCharCount) {
      return value;
    }
    const reversed = value.split('').reverse().join('');
    const truncated = reversed.slice(0, maxCharCount);
    const result = truncated.split('').reverse().join('') + '...';    
    return result;
  }
}
