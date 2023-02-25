import { z } from 'zod';

const UpdateSchema = z.object({
  type: z.literal('overs'),
  team: z.string(),
  text: z.string(),
});

export type Update = z.infer<typeof UpdateSchema>;

export const validateUpdate = (update: unknown): Update => UpdateSchema.parse(update);
