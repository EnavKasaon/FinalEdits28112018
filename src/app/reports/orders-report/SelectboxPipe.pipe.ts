import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectbox'
})

export class SelectboxPipe implements PipeTransform {
  transform(items: any, sel?: any): any {
    console.log("sel value: "+ sel);
    // var val = sel.toLowerCase() == 'true' ? true : false;
    return sel ? items.filter(sal => sal.received == sel) : items;
  }
}
