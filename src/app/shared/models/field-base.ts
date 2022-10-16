export class FieldBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  hidden: boolean;
  controlType: string;
  type: string;

  constructor(
    options: {
      value?: T;
      field?: string;
      label?: string;
      mandatory?: boolean;
      hidden?: string;
      controlType?: string;
      type?: string;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.field || '';
    this.label = options.label || '';
    this.required = !!options.mandatory;
    this.hidden = options.hidden === 'true' ? true : false;
    this.controlType = options.controlType || '';
    this.type = options.type || ' `';
  }
}

export class Textbox extends FieldBase<string> {
  override controlType = 'textbox';
}

export class Checkbox extends FieldBase<string> {
  override controlType = 'checkbox';
  override type = 'checkbox';
}
