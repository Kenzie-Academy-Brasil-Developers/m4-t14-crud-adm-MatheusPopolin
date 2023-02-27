import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

export const ensureEmailIsUnused = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [request.body.email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  next();
};
