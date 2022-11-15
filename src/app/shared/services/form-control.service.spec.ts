import { TestBed } from '@angular/core/testing';
import { FieldBase, Textbox } from '../models/field-base';
import { FormControlService } from './form-control.service';

describe('FormControlService', () => {
  let service: FormControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormControlService]
    });
    service = TestBed.inject(FormControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('toFormGroup return value form when the user has been called it', () => {
    const fields: FieldBase<any>[] = [
      new Textbox({
        field: 'name',
        label: 'Name',
        type: 'text',
        hidden: 'false',
        mandatory: true
      })
    ];
    const expectedResult = service.toFormGroup(fields);
    const spytoFormGroup: jasmine.Spy = spyOn(
      service,
      'toFormGroup'
    ).and.returnValue(expectedResult);
    service.toFormGroup(fields);
    expect(spytoFormGroup).toHaveBeenCalledWith(fields);
    expect(service.toFormGroup).toHaveBeenCalled();
  });
});
