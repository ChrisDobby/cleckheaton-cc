import PicoSanity from 'picosanity';

import { config } from './config';

export const sanityClient = new PicoSanity(config);

export const previewClient = new PicoSanity({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN ?? ``,
});

export const getClient = (usePreview = false) =>
  usePreview ? previewClient : sanityClient;
