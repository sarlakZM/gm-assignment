export type typeField = 'text' | 'email' | 'checkbox' | 'hidden' | 'check';

export interface JsonFieldModel {
  label: string;
  field: string;
  type: typeField;
  hidden: string;
  mandatory?: boolean;
}
