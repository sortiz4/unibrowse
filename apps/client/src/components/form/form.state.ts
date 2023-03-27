import { useReducer } from 'react';
import { Field } from '../../models';

export interface FormState {
  readonly field: Field;
  readonly search: string;
}

function createFormState(): FormState {
  return {
    field: Field.Name,
    search: '',
  };
}

function setFormState(current: FormState, next: Partial<FormState>): FormState {
  return Object.assign({}, current, next);
}

export function useFormState(): [FormState, (_: Partial<FormState>) => void] {
  return useReducer(setFormState, null, createFormState);
}