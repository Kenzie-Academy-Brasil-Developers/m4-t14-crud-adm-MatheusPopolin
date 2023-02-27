import { QueryResult } from "pg";
import { z } from "zod";
import {
  registerUserSchema,
  returnUserSchema,
  userSchema,
} from "../schemas/users.schemas";

export type iUserRequest = z.infer<typeof registerUserSchema>;
export type iUser = z.infer<typeof userSchema>;
export type iUserReturn = z.infer<typeof returnUserSchema>;

export type iUserResult = QueryResult<iUser>;
