import {Error} from './error';
import {Loading} from './loading';
export * from './app';
export * from './async-component';
export * from './card';
export * from './container';
export * from './details';
export * from './form';
export * from './header';
export * from './icons';
export * from './literal';
export * from './not-found';
export * from './page-button';
export * from './panel';
export * from './viewport';

export class States {
    static Error = Error;
    static Loading = Loading;
}
