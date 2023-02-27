import { iLoginRequest } from "../../interfaces/login.interfaces";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { iUserResult } from "../../interfaces/users.interfaces";

export const loginService = async (data: iLoginRequest): Promise<string> => {
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
    values: [data.email],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email or password", 401);
  }

  if (!queryResult.rows[0].active) {
    throw new AppError("Wrong email or password", 401);
  }

  const matchPassword: boolean = await compare(
    data.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};
