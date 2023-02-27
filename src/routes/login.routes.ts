import { Router } from "express";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import { loginSchema } from "../schemas/login.schemas";
import { loginController } from "../controllers/login.controller";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValid(loginSchema), loginController);
