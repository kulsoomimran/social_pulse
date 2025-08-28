import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "15m" });
};

const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });
};

const register = async (data: { username: string; email: string; password: string; }): Promise<IUser> => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashed });
  return await user.save();
};

const login = async (data: { email: string; password: string; }): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return {
    accessToken: generateAccessToken(user._id.toString()),
    refreshToken: generateRefreshToken(user._id.toString())
  };
};

const refresh = (token: string): string => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { id: string };
    return generateAccessToken(decoded.id);
  } catch {
    throw new Error("Invalid refresh token");
  }
};

export default { register, login, refresh };
