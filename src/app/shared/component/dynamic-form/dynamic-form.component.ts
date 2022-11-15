import { Component, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../../models/field-base';
import { ErrorHandlerForm } from '../../services/error-handler.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() field!: FieldBase<any>;
  @Input() form!: FormGroup;

  get isValid(){
    // return this.form.controls[this.field.key].valid;
    const formField = this.form.controls[this.field.key]
    for (let key in formField.errors) {
      this.field['errors'] = ErrorHandlerForm[key]
    }

    return !(!formField.valid && (formField.dirty || formField.touched));
  }

  onChangeConfrim(event: Event) {
    // this.form.controls['confirm'].setValue(
    //   (<HTMLInputElement>event.target).checked
    // );

    this.form.patchValue({confirm: (<HTMLInputElement>event.target).checked})
  }
}

