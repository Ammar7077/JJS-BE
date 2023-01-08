import { ReturnMessage } from "../interfaces/return-message.interface";
import * as bcrypt from 'bcrypt';

export async function registerUser(user: any): Promise<ReturnMessage> {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  return { message: 'auth.success.register', statusCode: 201 };
}