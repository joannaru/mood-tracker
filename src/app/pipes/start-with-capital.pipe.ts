import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startWithCapital'
})
export class StartWithCapitalPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.charAt(0).toLocaleUpperCase()+value.slice(1)
  }

}
