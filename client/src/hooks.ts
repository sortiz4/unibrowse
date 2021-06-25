import { useEffect } from 'react';
import { Observable } from 'rxjs';

type ObservableEffects<T, U> = [() => Observable<T>, ((_: T) => void | null)?, ((_: U) => void | null)?, (() => void | null)?];

export function useObservableEffect<T, U>([event, ...effects]: ObservableEffects<T, U>, inputs?: unknown[]): void {
  useEffect(
    () => {
      const subscription = event().subscribe(...effects);
      return () => subscription.unsubscribe();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    inputs,
  );
}
