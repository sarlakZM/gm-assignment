import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../../models/field-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() field!: FieldBase<any>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  onChangeConfrim(event: Event) {
    this.form.controls['confirm'].setValue(
      (<HTMLInputElement>event.target).checked
    );
  }
}
