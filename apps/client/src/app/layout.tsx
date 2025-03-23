import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import './layout.scss';

export const metadata: Readonly<Metadata> = {
  title: 'Unibrowse',
  icons: [
    {
      rel: 'icon',
      url: 'static/icons/favicon-512.png',
      type: 'image/png',
    },
  ],
};

export const viewport: Readonly<Viewport> = {
  width: 'device-width',
  viewportFit: 'cover',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    {
      media: '(prefers-color-scheme: dark)',
      color: '#000000',
    },
    {
      media: '(prefers-color-scheme: light)',
      color: '#ffffff',
    },
  ],
};

export interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactNode {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
