import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormControlService } from './services/form-control.service';
import { JsonFieldsService } from './services/json-fields-servcie';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [RouterModule, ReactiveFormsModule, DynamicFormComponent],
  providers: [JsonFieldsService, FormControlService],
})
export class SharedModule {}
