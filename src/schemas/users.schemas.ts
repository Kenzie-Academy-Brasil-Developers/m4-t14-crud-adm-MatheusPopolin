import { hashSync } from "bcryptjs";
import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email().max(100),
  password: z.string().transform((password) => {
    return hashSync(password, 10);
  }),
  admin: z.optional(z.boolean()),
});

export const userSchema = registerUserSchema.extend({
  admin: z.boolean(),
  id: z.number().int(),
  active: z.boolean(),
});

export const returnUserSchema = userSchema.omit({
  password: true,
});

export const returnAllUsersSchema = z.array(returnUserSchema);

export const updateUserSchema = z.object({
  name: z.optional(z.string().min(3).max(20)),
  email: z.optional(z.string().email().max(100)),
  password: z.optional(
    z.string().transform((password) => {
      return hashSync(password, 10);
    })
  ),
});
