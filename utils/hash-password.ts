import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = Math.floor(Math.random() * (15 - 7 + 1)) + 7;  //  Random number between 7 and 15 because why not
  return await bcrypt.hash(password, saltRounds);
}