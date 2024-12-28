import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "JWTSECREAT");
};

export default generateToken;
