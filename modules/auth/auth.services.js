import bcrypt from "bcrypt";
import { createAccessToken } from "./utils/token.js";
import ApiError from "../../common/utils/api-error.js";

export const signUp = async (payload, pool) => {
  const { firstName, lastName, email, password } = payload;

  const existing = await pool.query("select * from users where email = $1", [
    email,
  ]);

  if (existing.rowCount > 0)
    throw ApiError.conflict(`User with ${email} already exists`);

  const hashedPassword = bcrypt.hash(password, 12);

  const result = pool.query(
    `
        insert into users (first_name, last_name, email, password)
        values ($1, $2, $3, $4)
        returning id, first_name, last_name, email
        `,
    [firstName, lastName, email, hashedPassword],
  );

  const user = result.rows[0];

  return user;
};
