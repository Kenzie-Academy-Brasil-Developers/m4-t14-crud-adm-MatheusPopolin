import {
  iUserRequest,
  iUserResult,
  iUserReturn,
} from "../../interfaces/users.interfaces";
import format from "pg-format";
import { client } from "../../database";
import { returnUserSchema } from "../../schemas/users.schemas";

export const registerUserService = async (
  data: iUserRequest
): Promise<iUserReturn> => {
  const queryString: string = format(
    `
        INSERT INTO 
            users
        (%I) VALUES (%L)
        RETURNING*;
        `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: iUserResult = await client.query(queryString);

  const newUser = returnUserSchema.parse(queryResult.rows[0]);

  return newUser;
};
