import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

export type iLoginRequest = z.infer<typeof loginSchema>;
