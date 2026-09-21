import { useReducer } from 'react';
import { Field } from '../../common/models';

export interface FormState {
  readonly field: Field;
  readonly search: string;
}

export function useFormState(): [FormState, (_: Partial<FormState>) => void] {
  const reducer = (current: FormState, next: Partial<FormState>): FormState => {
    return Object.assign({}, current, next);
  };

  const initializer = (): FormState => {
    return {
      field: Field.Name,
      search: '',
    };
  };

  return useReducer(reducer, null, initializer);
}
