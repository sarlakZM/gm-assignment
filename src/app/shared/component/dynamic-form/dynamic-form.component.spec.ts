import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FieldBase } from '../../models/field-base';
import { FormControlService } from '../../services/form-control.service';
import { JsonFieldsService } from '../../services/json-fields-servcie';
import { SharedModule } from '../../shared.module';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  let fields: FieldBase<any>[];

  let formControlService: FormControlService;
  let jsonFieldsService: JsonFieldsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [SharedModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formControlService = TestBed.inject(FormControlService);
    jsonFieldsService = TestBed.inject(JsonFieldsService);
  });

  beforeEach(() => {
    fields = jsonFieldsService.getJsonFields();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check the rendered name field in form', () => {
    expect(component.field).toBeUndefined();

    component.field = fields[0];
    component.form = formControlService.toFormGroup([component.field]);
    fixture.detectChanges();
    const nameField = fixture.debugElement.query(By.css('#name'));
    expect(nameField).toBeTruthy();
    expect(component.isValid).toBeFalsy();

    component.field = { ...fields[0], value: 'Gerimedica' };
    component.form = formControlService.toFormGroup([component.field]);
    expect(component.isValid).toBeTruthy();
  });

  it('Check the rendered email field in form', () => {
    expect(component.field).toBeUndefined();

    component.field = fields[1];
    component.form = formControlService.toFormGroup([component.field]);
    fixture.detectChanges();
    const emailField = fixture.debugElement.query(By.css('#email'));
    expect(emailField).toBeTruthy();
    expect(component.isValid).toBeFalsy();

    component.field = { ...fields[0], value: 'gerimedica@gmail.com' };
    component.form = formControlService.toFormGroup([component.field]);
    expect(component.isValid).toBeTruthy();
  });

  it('Check the rendered checkbox field in form', () => {
    expect(component.field).toBeUndefined();

    component.field = fields[2];
    component.form = formControlService.toFormGroup([component.field]);
    fixture.detectChanges();

    const confirmField = fixture.debugElement.query(By.css('#confirm'));
    expect(confirmField).toBeTruthy();
    expect(component.isValid).toBeTruthy();
  });
});
