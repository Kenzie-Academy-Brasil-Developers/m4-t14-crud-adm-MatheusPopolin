import { Request, Response } from "express";
import { activeUserService } from "../services/users/activeUser.service";
import { inactiveUserService } from "../services/users/inactiveUser.service";
import { listAllUsersService } from "../services/users/listAllUsers.service";
import { listLoggedUserService } from "../services/users/listLoggedUser.service";
import { registerUserService } from "../services/users/registerUser.service";
import { updateUserService } from "../services/users/updateUser.service";

export const registerUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const newUser = await registerUserService(request.body);

  return response.status(201).json(newUser);
};

export const listAllUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listAllUsersService();

  return response.status(200).json(users);
};

export const listLoggedUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user = await listLoggedUserService(request.user.id);

  return response.status(200).json(user);
};

export const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const updatedUser = await updateUserService(request.body, request.user);

  return response.status(200).json(updatedUser);
};

export const inactiveUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await inactiveUserService(parseInt(request.params.id));

  return response.status(204).send();
};

export const activeUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const activatedUser = await activeUserService(parseInt(request.params.id));

  return response.status(200).json(activatedUser);
};
