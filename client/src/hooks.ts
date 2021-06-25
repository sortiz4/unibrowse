import { useEffect } from 'react';
import { Observable } from 'rxjs';

type ObservableEffects<T, U> = [() => Observable<T>, ((_: T) => void | null)?, ((_: U) => void | null)?, (() => void | null)?];

export function useObservableEffect<T, U>([create, next, error, complete]: ObservableEffects<T, U>, inputs?: unknown[]): void {
  useEffect(
    () => {
      const subscription = create().subscribe({ next, error, complete });
      return () => subscription.unsubscribe();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    inputs,
  );
}
