import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

export const ensureUserExists = async (
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
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [request.params.id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  next();
};
