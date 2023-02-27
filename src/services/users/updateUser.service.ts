import format from "pg-format";
import { client } from "../../database";
import { iUserResult, iUserReturn } from "../../interfaces/users.interfaces";
import { QueryConfig } from "pg";
import { returnUserSchema } from "../../schemas/users.schemas";

export const updateUserService = async (
  data: any,
  user: any
): Promise<iUserReturn> => {
  const queryString: string = format(
    `
        UPDATE 
            users
        SET 
          (%I) = ROW (%L)
        WHERE
          id = $1
        RETURNING 
            *;
        `,
    Object.keys(data),
    Object.values(data)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [user.id],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  const updatedUser = returnUserSchema.parse(queryResult.rows[0]);

  return updatedUser;
};
