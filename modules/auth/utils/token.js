import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "jwtrefreshsecret";

export function createAccessToken(payload) {
  return JWT.sign(payload, { expiresIn: "15m" });
}

export function verifyUserAccessToken(token) {
  return JWT.verify(token, JWT_SECRET);
}

export function createRefreshToken(payload) {
  return JWT.sign(payload, { expiresIn: "24h" });
}

export function verifyRefreshToken(token) {
  return JWT.verify(token, JWT_REFRESH_SECRET);
}
