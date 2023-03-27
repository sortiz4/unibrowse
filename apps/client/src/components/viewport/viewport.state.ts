import { useReducer } from 'react';
import { CodePoint, getCodePoints, Page, Search } from '../../models';

export interface ViewportState {
  readonly search: Search;
  readonly page?: Page<CodePoint>,
  readonly active?: CodePoint;
}

export function useViewportState(): [ViewportState, (_: Partial<ViewportState>) => void] {
  function reducer(current: ViewportState, next: Partial<ViewportState>): ViewportState {
    return Object.assign({}, current, next);
  }

  function initializer(): ViewportState {
    return {
      search: {
        page: 1,
      },
      page: getCodePoints({ page: 1 }),
    };
  }

  return useReducer(reducer, null, initializer);
}
