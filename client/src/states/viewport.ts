import { useReducer } from 'react';
import { Status } from './status';
import { CodePoint, Page } from '../models';

export interface Search {
  readonly page?: number;
  readonly field?: number;
  readonly search?: string;
}

export interface ViewportState {
  readonly search: Search;
  readonly status: Status;
  readonly page?: Page<CodePoint>,
  readonly error?: Error;
  readonly active?: CodePoint;
}

function createViewportState(): ViewportState {
  return {
    search: { page: 1 },
    status: Status.Pending,
  };
}

function setViewportState(current: ViewportState, next: Partial<ViewportState>): ViewportState {
  return Object.assign({}, current, next);
}

export function useViewportState(): [ViewportState, (_: Partial<ViewportState>) => void] {
  return useReducer(setViewportState, null, createViewportState);
}
