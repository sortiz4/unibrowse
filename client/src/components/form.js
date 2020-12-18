import { Hooks } from 'core/hooks';
import { React } from 'core/react';
import { Unicode } from 'core/string';

const CODEPOINT = 0;
const LITERAL = 1;
const NAME = 2;

class State {
  field = NAME;
  query = '';
}

export function Form({ onSubmit }) {
  const [state, setState] = Hooks.useClassState(State);

  function onType(event) {
    setState({ query: event.target.value });
  }

  function onSelect(event) {
    setState({ field: Number(event.target.value) });
  }

  function onSubmitOverride(event) {
    event.preventDefault();

    // Grab the form inputs
    let { field, query } = state;

    // Transform the query
    if (field === CODEPOINT) {
      // Transform hexadecimal to decimal
      query = Number.parseInt(
        query.trim().replace(/[uU]\+/, ''),
        16,
      );
      if (Number.isNaN(query)) {
        query = '';
      }
    } else if (field === LITERAL) {
      // Transform literal to decimal
      query = query.length > 0 ? (
        Unicode.fromString(query)
      ) : (
        ''
      );
    } else {
      // Trim name-based queries
      query = query.trim();
    }

    // Transform the field
    field = field === NAME ? (
      'name'
    ) : (
      'value'
    );

    // Apply the filter
    onSubmit({ field, query });
  }
  return (
    <form onSubmit={onSubmitOverride}>
      <fieldset>
        <input
          name="query"
          type="search"
          placeholder="Search..."
          value={state.query}
          onChange={onType}
        />
        <div className="options">
          <label>
            <input
              name="field"
              type="radio"
              value={CODEPOINT}
              checked={state.field === CODEPOINT}
              onChange={onSelect}
            />
            <span>Code point</span>
          </label>
          <label>
            <input
              name="field"
              type="radio"
              value={LITERAL}
              checked={state.field === LITERAL}
              onChange={onSelect}
            />
            <span>Literal</span>
          </label>
          <label>
            <input
              name="field"
              type="radio"
              value={NAME}
              checked={state.field === NAME}
              onChange={onSelect}
            />
            <span>Name</span>
          </label>
        </div>
      </fieldset>
    </form>
  );
}
