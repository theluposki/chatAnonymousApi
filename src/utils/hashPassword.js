import bcrypt from "bcryptjs";

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

export { hash, compare };
