// Importaciones de las dependencias a utilizar
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para usuario donde sus pueden ver todas sus propiedades
const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  webSite: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Se exporta el modelo del usuario para su uso
module.exports = mongoose.model("User", UserSchema);
