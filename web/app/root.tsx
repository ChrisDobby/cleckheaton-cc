import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import Header from './components/header';
import headerStyles from './components/header.css';
import rootStyles from './styles/root.css';

export const meta: MetaFunction = () => ({
  title: 'Cleckheaton Cricket Club',
  description: 'Website of Cleckheaton Cricket Club',
});

export const links = () => [
  { rel: 'stylesheet', href: headerStyles },
  { rel: 'stylesheet', href: rootStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: 'Oscine, AxisSTD, "Helvetica Neue", helvetica, arial, sans-serif',
        }}
      >
        <div className="page">
          <div className="main-wrapper">
            <div className="main">
              <Header />
              <div className="scroll-container">
                <main>
                  <Outlet />
                </main>
              </div>
            </div>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
