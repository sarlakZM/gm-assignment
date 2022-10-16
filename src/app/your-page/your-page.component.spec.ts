import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkbox, FieldBase, Textbox } from 'src/app/shared/models/field-base';
import { FormControlService } from 'src/app/shared/services/form-control.service';
import { JsonFieldsService } from 'src/app/shared/services/json-fields-servcie';
import { SharedModule } from 'src/app/shared/shared.module';

import { YourPageComponent } from './your-page.component';

describe('YourPageComponent', () => {
  let component: YourPageComponent;
  let fixture: ComponentFixture<YourPageComponent>;

  let formControlService: FormControlService;
  let jsonFieldsService: JsonFieldsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(YourPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formControlService = TestBed.inject(FormControlService);
    jsonFieldsService = TestBed.inject(JsonFieldsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check and get the value of json file', () => {
    const expectedResult: FieldBase<string>[] = [
      new Textbox({
        field: 'name',
        label: 'Name',
        type: 'text',
        hidden: 'false',
        mandatory: true
      }),
      new Textbox({
        field: 'email',
        label: 'Email',
        type: 'text',
        hidden: 'false',
        mandatory: true
      }),
      new Checkbox({
        field: 'confirm',
        label: 'Checkbox with confirmation',
        type: 'check',
        hidden: 'false'
      }),
      new Textbox({
        field: 'hiddenField',
        label: '',
        type: 'text',
        hidden: 'true',
        mandatory: false
      })
    ];
    spyOn(jsonFieldsService, 'getJsonFields').and.returnValue(expectedResult);
    expect(jsonFieldsService.getJsonFields()).toBe(expectedResult);
  });

  it('Validation form', () => {
    const fields: FieldBase<string>[] = jsonFieldsService.getJsonFields();
    component.form = formControlService.toFormGroup(fields);
    expect(component.form.valid).toBeTruthy();
  });
});
