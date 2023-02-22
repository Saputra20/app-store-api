import * as bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUND = 10;

export const hash = async (plainText: string, saltRound = BCRYPT_SALT_ROUND) =>
  bcrypt.hash(plainText, saltRound);

export const compareHash = async (plainText: string, hash: string) =>
  bcrypt.compare(plainText, hash);
