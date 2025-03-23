import { ReactElement } from 'react';
import { App } from '../components/app/app';

export default async function Page(): Promise<ReactElement> {
  return (
    <App/>
  );
}
