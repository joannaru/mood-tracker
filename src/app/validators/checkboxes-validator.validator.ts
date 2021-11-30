import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createCheckboxesValidator(options:string[]):ValidatorFn{
    return (controls: AbstractControl): ValidationErrors | null => {
        const values:string[] = controls.get('relax')?.value;
        if(values){
            for(let val of values){
             let keyName = Object.keys(val)[0]
             let objValue = Object.values(val)[0];
             let keyExists = options.find(el => el===keyName)
             let valueExists = (objValue.toString() === 'true' || objValue.toString()  === 'false');
                if(!keyExists || !valueExists){
                    return {invalidOption: true}
                }
            }
            
        }
        return null;
    }
}
