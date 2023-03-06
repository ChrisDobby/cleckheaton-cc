import { Suspense } from 'react';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { json, MetaFunction } from '@remix-run/node';
import Header from './components/header';
import Subscription from './components/subscription';
import headerStyles from './components/header.css';
import rootStyles from './styles/root.css';
import subscriptionStyles from './components/subscription.css';

export const meta: MetaFunction = () => ({
  title: 'Cleckheaton Cricket Club',
  description: 'Website of Cleckheaton Cricket Club',
});

export const links = () => [
  { rel: 'stylesheet', href: headerStyles },
  { rel: 'stylesheet', href: rootStyles },
  { rel: 'stylesheet', href: subscriptionStyles },
];

export async function loader() {
  return json({
    ENV: {
      SUBSCRIPTION_URL: process.env.SUBSCRIPTION_URL,
      SUBSCRIPTION_PUBLIC_KEY: process.env.SUBSCRIPTION_PUBLIC_KEY,
      API_KEY: process.env.API_KEY,
    },
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
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
                <Suspense>
                  <Subscription />
                </Suspense>
                <main>
                  <Outlet />
                </main>
              </div>
            </div>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
