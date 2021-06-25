import axios from 'axios';
import { defer, Observable } from 'rxjs';
import { ApiCodePoint, CodePoint, mapApiCodePointToCodePoint, mapPageToPage, Page } from './models';
import { Search } from './states/viewport';

export function getCodePoints(search: Search): Observable<Page<CodePoint>> {
  function onSubscribe(): Promise<Page<CodePoint>> {
    return (
      axios
        .get<Page<ApiCodePoint>>('/api/codepoints/', { params: search })
        .then(r => mapPageToPage(r.data, mapApiCodePointToCodePoint))
    );
  }

  return defer(onSubscribe);
}
