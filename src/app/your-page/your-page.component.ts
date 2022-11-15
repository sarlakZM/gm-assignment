import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  OnInit,
  Optional
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldBase } from 'src/app/shared/models/field-base';
import { JsonFieldsService } from 'src/app/shared/services/json-fields-servcie';
import { FormControlService } from 'src/app/shared/services/form-control.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './your-page.component.html',
  styleUrls: ['./your-page.component.scss']
})
export class YourPageComponent implements OnInit {
  fields: FieldBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(
    @Optional() private readonly formControlService: FormControlService,
    @Optional() private readonly jsonFieldsService: JsonFieldsService
  ) {}

  ngOnInit() {
    this.fields = this.jsonFieldsService?.getJsonFields();
    this.form = this.formControlService?.toFormGroup(this.fields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
