import { ChangeEvent, FormEvent, ReactElement } from 'react';
import { useFormState } from './form.state';
import { Field, Search } from '../../models';
import { getUnicodeFromString } from '../../utils';

interface FormProps {
  readonly onSubmit?: (_: Search) => void;
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

    function getSearch(): string {
      switch (state.field) {
        case Field.CodePoint: {
          const value = Number.parseInt(state.search.trim().replace(/[uU]\+/, ''), 16);

          if (!Number.isNaN(value)) {
            return value.toString(16).toUpperCase();
          }

          return '';
        }
        case Field.Literal: {
          if (state.search.length > 0) {
            return getUnicodeFromString(state.search).toString(16).toUpperCase();
          }

          return '';
        }
        case Field.Name: {
          return state.search.trim();
        }
      }
    }

    onSubmit?.({ field: state.field, search: getSearch() });
  }

  return (
    <form onSubmit={onSubmitOverride}>
      <fieldset>
        <input name="search" type="text" placeholder="Search..." value={state.search} onChange={onType}/>
        <div className="form-options">
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
