import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FieldBase, Textbox } from '../models/field-base';
import { FormControlService } from './form-control.service';

describe('BaseMultiService', () => {
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

  it('Create team', async () => {
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
  });
});
