import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { iUserResult, iUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

export const activeUserService = async (id: number): Promise<iUserReturn> => {
  let queryString: string = `
        SELECT
          *
        FROM 
            users
        WHERE
            id = $1;
    `;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  let queryResult: iUserResult = await client.query(queryConfig);

  if (queryResult.rows[0].active) {
    throw new AppError("User already active", 400);
  }

  queryString = `
        UPDATE 
            users
        SET 
            active = true
        WHERE
            id = $1
        RETURNING
            *;
    `;

  queryConfig = {
    text: queryString,
    values: [id],
  };

  queryResult = await client.query(queryConfig);

  const activatedUser = returnUserSchema.parse(queryResult.rows[0]);

  return activatedUser;
};
