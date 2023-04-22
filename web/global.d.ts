export {};

declare global {
  interface Window {
    ENV: {
      SUBSCRIPTION_URL: string;
      SUBSCRIPTION_PUBLIC_KEY: string;
      API_KEY: string;
      UPDATES_WEB_SOCKET_URL: string;
    };
  }
}
