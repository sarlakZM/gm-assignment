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

    nameField.nativeNode.dispatchEvent(new Event('input')) ;
    expect(component.isValid).toBeFalsy();
    //Or
    expect(component.form.valid).toBeFalsy();

    let  errors = component.form.controls['name'].errors || {};
    expect(errors['required']).toBeTruthy();

    //setting value for name
    component.field = { ...fields[0], value: 'Gerimedica' };
    component.form = formControlService.toFormGroup([component.field]);
    //Or
    component.form.patchValue(component.field);

    errors = component.form.controls['name'].errors || {};
    expect(component.form.valid).toBeTruthy();
    expect(component.isValid).toBeTruthy();
    expect(errors['required']).toBeFalsy();

  });

  it('Check the rendered email field in form', () => {
    expect(component.field).toBeUndefined();

    component.field = fields[1];
    component.form = formControlService.toFormGroup([component.field]);
    fixture.detectChanges();
  
    let emailElement = fixture.debugElement.query(By.css('#email'));
    emailElement.nativeElement.dispatchEvent(new Event('input')) ;


    expect(emailElement).toBeTruthy();
    expect(component.isValid).toBeFalsy();
    //Or
    expect(component.form.valid).toBeFalsy();
    expect(emailElement.nativeElement.innerText).toEqual('');

    let emailField = component.form.controls['email'];
    let  errors = emailField.errors || {};
    expect(errors['required']).toBeTruthy();

    //setting invalid email 
    component.field = { ...fields[1], value: 'Not Valid Email' };
    component.form = formControlService.toFormGroup([component.field]);
    fixture.detectChanges();
    emailElement.nativeElement.dispatchEvent(new Event('input')) ;
    expect(component.isValid).toBeFalsy();
    expect(component.form.valid).toBeFalsy()
    emailField = component.form.controls['email']
    errors = emailField.errors || {};
    expect(errors['email']).toBeTruthy();
    expect(errors['required']).toBeUndefined();

    //setting invalid email 
    component.field = { ...fields[1], value: 'correct@gmail.com' };
    component.form = formControlService.toFormGroup([component.field]);
    fixture.detectChanges();
    emailElement.nativeElement.dispatchEvent(new Event('input')) ;
    expect(component.isValid).toBeTruthy();
    expect(component.form.valid).toBeTruthy()
    emailField = component.form.controls['email']
    errors = emailField.errors || {};
    expect(errors['email']).toBeUndefined();


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
