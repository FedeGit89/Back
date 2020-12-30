const mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es necesario"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },  
  dni: {
    type: String,
    required: [true, "El dni es necesario"],
  },
  fechaNacimiento: {
    type: Date,
    required: [true, "La fecha de nacimiento es necesaria"],
  },
  fechaAuditoria: {
    type: Date,
    default: Date.now,
  },
});

// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

usuarioSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser único",
});

module.exports = mongoose.model("Usuario", usuarioSchema);
