import Head from 'next/head';
import { Fragment, ReactElement } from 'react';
import { Root } from '../components/root/root';

export default function Page(): ReactElement {
  return (
    <Fragment>
      <Head>
        <title>
          Unibrowse
        </title>
        <base href="/"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, width=device-width"/>
        <link rel="icon" type="image/png" href="static/icons/favicon-512.png"/>
      </Head>
      <Root/>
    </Fragment>
  );
}
