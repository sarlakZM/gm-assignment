import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldBase } from '../models/field-base';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {
  toFormGroup(fields: FieldBase<any>[]): FormGroup {
    const group: any = {};

    fields.forEach((field) => {
      const fieldControl = new FormControl(field.value || '');
      field.required && fieldControl.addValidators(Validators.required);
      field.key === 'email' && fieldControl.addValidators(Validators.email);
      group[field.key] = fieldControl;
    });

    return new FormGroup(group);
  }
}
