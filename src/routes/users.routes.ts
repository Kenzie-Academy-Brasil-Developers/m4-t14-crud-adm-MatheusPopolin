import { Router } from "express";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import { registerUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { ensureUserExists } from "../middlewares/ensureUserExists";
import { ensureEmailIsUnused } from "../middlewares/ensureEmailIsUnused";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid";
import { ensureHavePermission } from "../middlewares/ensureHavePermission";
import {
  activeUserController,
  inactiveUserController,
  listAllUsersController,
  listLoggedUserController,
  registerUserController,
  updateUserController,
} from "../controllers/users.controllers";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValid(registerUserSchema),
  ensureEmailIsUnused,
  registerUserController
);
usersRoutes.get(
  "",
  ensureTokenIsValid,
  ensureHavePermission("admin"),
  listAllUsersController
);
usersRoutes.get("/profile", ensureTokenIsValid, listLoggedUserController);
usersRoutes.patch(
  "/:id",
  ensureUserExists,
  ensureTokenIsValid,
  ensureHavePermission("ownerAndAdmin"),
  ensureDataIsValid(updateUserSchema),
  ensureEmailIsUnused,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureUserExists,
  ensureTokenIsValid,
  ensureHavePermission("ownerAndAdmin"),
  inactiveUserController
);
usersRoutes.put(
  "/:id/recover",
  ensureUserExists,
  ensureTokenIsValid,
  ensureHavePermission("admin"),
  activeUserController
);
