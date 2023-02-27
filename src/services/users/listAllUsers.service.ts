import { client } from "../../database";
import { iUserResult, iUserReturn } from "../../interfaces/users.interfaces";
import { returnAllUsersSchema } from "../../schemas/users.schemas";

export const listAllUsersService = async (): Promise<iUserReturn[]> => {
  const queryString: string = `
          SELECT 
            * 
          FROM 
            users;
        `;

  const queryResult: iUserResult = await client.query(queryString);

  const newUsers = returnAllUsersSchema.parse(queryResult.rows);

  return newUsers;
};
