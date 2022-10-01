import { FormArray, FormGroup, ValidatorFn } from '@angular/forms';

export function ValidateServiceArray(): ValidatorFn {
  return (formArray: FormArray): { [key: string]: any } | null => {
    // let valid = true;
    // formArray.controls.forEach((x: FormGroup) => {
    //   valid = valid && x.value.name == 'a';
    // });
    // return valid ? null : { error: 'Not all name are a' };
    debugger;
    return null;
  };
}
