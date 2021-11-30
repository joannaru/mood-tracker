import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minOneOptionValidator(options:string[]):ValidatorFn{
    return (controls: AbstractControl): ValidationErrors | null => {
        const values:string[] = controls.get('relax')?.value;
        if(values){
            let minOneOption=false;
            for(let val of values){
             let objValue = Object.values(val)[0];
                if(objValue.toString()==='true')
                    minOneOption=true;
            }
            if(minOneOption===false){
                return {optionRequired:true} 
            }
        }
        return null;
    }
}
