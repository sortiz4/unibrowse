import { ChangeEvent, FormEvent, ReactElement } from 'react';
import { Field, useFormState } from './form.state';
import { ApiField, Search } from '../../models';
import { unicodeFromString } from '../../utils';

interface FormProps {
  onSubmit?: (_: Search) => void;
}

export function Form({ onSubmit }: FormProps): ReactElement {
  const [state, setState] = useFormState();

  function onType(event: ChangeEvent<HTMLInputElement>): void {
    setState({ search: event.target.value });
  }

  function onSelect(event: ChangeEvent<HTMLInputElement>): void {
    setState({ field: +event.target.value });
  }

  function onSubmitOverride(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    function getField(): number {
      if (state.field === Field.Name) {
        return ApiField.Name;
      }
      return ApiField.Value;
    }

    function getSearch(): string {
      switch (state.field) {
        case Field.CodePoint:
          const hexadecimal = Number.parseInt(state.search.trim().replace(/[uU]\+/, ''), 16);
          if (!Number.isNaN(hexadecimal)) {
            return `${hexadecimal}`;
          }
          return '';
        case Field.Literal:
          if (state.search.length > 0) {
            return `${unicodeFromString(state.search)}`;
          }
          return '';
        case Field.Name:
          return state.search.trim();
      }
    }

    onSubmit?.({ field: getField(), search: getSearch() });
  }

  return (
    <form onSubmit={onSubmitOverride}>
      <fieldset>
        <input name="search" type="search" placeholder="Search..." value={state.search} onChange={onType}/>
        <div className="options">
          <label>
            <input name="field" type="radio" value={Field.CodePoint} checked={state.field === Field.CodePoint} onChange={onSelect}/>
            <span>
              Code point
            </span>
          </label>
          <label>
            <input name="field" type="radio" value={Field.Literal} checked={state.field === Field.Literal} onChange={onSelect}/>
            <span>
              Literal
            </span>
          </label>
          <label>
            <input name="field" type="radio" value={Field.Name} checked={state.field === Field.Name} onChange={onSelect}/>
            <span>
              Name
            </span>
          </label>
        </div>
      </fieldset>
    </form>
  );
}
