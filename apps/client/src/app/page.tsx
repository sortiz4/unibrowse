import { ReactNode } from 'react';
import { App } from '../components/app';

export default async function Page(): Promise<ReactNode> {
  return (
    <App/>
  );
}
