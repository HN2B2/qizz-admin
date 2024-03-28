import { jwtVerify } from "jose";

interface UserJwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verifiedToken = await jwtVerify(
      token,
      Buffer.from(getJwtSecret(), "base64")
    );
    return verifiedToken.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token is expired. Please log in again.");
  }
};
