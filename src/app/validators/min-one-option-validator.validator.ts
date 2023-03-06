import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minOneOptionValidator(fieldName: string): ValidatorFn {
  return (controls: AbstractControl): ValidationErrors | null => {
    const values: string[] = controls.get(fieldName)?.value;
    if (values) {
      let minOneOption = false;
      for (let val of values) {
        let objValue = Object.values(val)[0];
        if (objValue.toString() === 'true') minOneOption = true;
      }
      console.log('minOneOptionValidator', minOneOption);

      if (minOneOption === false) {
        return { optionRequired: true };
      }
    }

    return null;
  };
}
