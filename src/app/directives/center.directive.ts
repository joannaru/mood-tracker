import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCenter]'
})
export class CenterDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.textAlign='center';
  }
  
}
