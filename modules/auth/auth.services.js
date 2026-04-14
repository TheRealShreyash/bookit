import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "./utils/token.js";
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

  const accessToken = createAccessToken({ id: exists.rows[0].id });

  const refreshToken = createRefreshToken({ id: exists.rows[0].id });

  await pool.query("update users set refresh_token = $1 where email = $2", [
    refreshToken,
    email,
  ]);

  return { accessToken: accessToken, refreshToken: refreshToken };
};

export const logout = async (req, pool) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) throw ApiError.badRequest("No refresh token found.");

  await pool.query(
    "update users set refresh_token = null where id = $1 and refresh_token = $2",
    [req.user.id, refreshToken],
  );
};

export const refreshToken = async (req, pool) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) throw ApiError.badRequest("No refresh token found.");

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) throw ApiError.badRequest("Incorrect refresh token");

  const result = await pool.query(
    "select * from users where id = $1 and refresh_token = $2",
    [decoded.id, refreshToken],
  );

  if (result.rowCount === 0)
    throw ApiError.unauthorized("Invalid refresh token");

  const user = result.rows[0];

  const accessToken = createAccessToken({ id: user.id });

  return { accessToken };
};
