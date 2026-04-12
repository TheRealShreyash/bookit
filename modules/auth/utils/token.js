import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

export function createAccessToken(payload) {
  return JWT.sign(payload, { expiresIn: "15m" });
}

export function verifyUserAccessToken(token) {
  return JWT.verify(token, JWT_SECRET);
}
