import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "./utils/token.js";
import ApiError from "../../common/utils/api-error.js";

export const signUp = async (payload, pool) => {
  const { firstName, lastName, email, password } = payload;

  const existing = await pool.query("select * from users where email = $1", [
    email,
  ]);

  if (existing.rowCount > 0)
    throw ApiError.conflict(`User with ${email} already exists`);

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
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

export const signIn = async (payload, pool) => {
  const { email, password } = payload;

  const exists = await pool.query("select * from users where email = $1", [
    email,
  ]);

  if (exists.rowCount === 0)
    throw ApiError.notFound(`User with the email ${email} doesn't exist`);

  const isMatch = await bcrypt.compare(password, exists.rows[0].password);

  if (!isMatch) throw ApiError.badRequest("Password is incorrect");

  const accessToken = createAccessToken({ id: exists.id });

  const refreshToken = createRefreshToken({ id: exists.id });

  const user = Object.create(exists.rows[0]);

  delete user.password;
  delete user.refreshToken;

  return { accessToken: accessToken, refreshToken: refreshToken, user: user };
};

export const logout = async (req, pool) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) throw ApiError.badRequest("No refresh token found.");

  await pool.query(
    "update table users set refresh_token = null where id = $1 and refresh_token = $2",
    [req.user.id, refreshToken],
  );
};
