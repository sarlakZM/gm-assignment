import { Injectable } from '@angular/core';

import { JsonFieldModel } from '../models/json-field.model';
import { Checkbox, FieldBase, Textbox } from '../models/field-base';

import * as data from '../../../assets/to-render.json';

@Injectable({
  providedIn: 'root'
})
export class JsonFieldsService {
  getJsonFields(): FieldBase<string>[] {
    const jsonfields: JsonFieldModel[] = (data as any).default;
    const newfieldsStructure = jsonfields.reduce(
      (acc: FieldBase<string>[], field) => {
        acc =
          field.type == 'check'
            ? [...acc, new Checkbox(field)]
            : [...acc, new Textbox(field)];
        return acc;
      },
      []
    );
    return newfieldsStructure;
  }
}
