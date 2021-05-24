const user = require("../models/user");
const { createToken } = require("./user");
const bcryptjs = require("bcryptjs");

async function login(input) {
  const { email, password } = input;

  // Compara el usuario introducido por el usuario al guardada en la base de datos
  const userFound = await user.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error("Error en el email o contraseña");

  // Compara la contraseña introducida por el usuario a la guardada en la base de datos
  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Error en el email o contraseña");

  return {
    token: createToken(userFound, process.env.SECRET_KEY, "2h"),
  };
}

module.exports = { login };
