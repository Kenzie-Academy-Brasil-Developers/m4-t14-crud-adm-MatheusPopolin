import { QueryConfig } from "pg";
import { client } from "../../database";
import { iUserResult, iUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

export const listLoggedUserService = async (
  id: number
): Promise<iUserReturn> => {
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
    values: [id],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  const user = returnUserSchema.parse(queryResult.rows[0]);

  return user;
};
