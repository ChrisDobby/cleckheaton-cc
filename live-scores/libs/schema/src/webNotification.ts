import { z } from 'zod';

const WebNotificationSchema = z.object({
  subscription: z.object({
    endpoint: z.string(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string(),
    }),
  }),
  title: z.string(),
  body: z.string(),
});

export type WebNotification = z.infer<typeof WebNotificationSchema>;

export const validateWebNotification = (webNotification: unknown): WebNotification => WebNotificationSchema.parse(webNotification);
