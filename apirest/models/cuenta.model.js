const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let cuentaSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El email es necesario'],
        unique: true
      },
    saldo: {
        type: Number,
        default: 50000
    },
    moneda: {
        type: String,
        enum : ['ARS'],
        default: 'ARS'
    },
    fechaAuditoria: {
        type: Date,
        default: Date.now,
      },
    });

    cuentaSchema.plugin(uniqueValidator, {
        message: "{PATH} debe de ser único",
      });
    
    cuentaSchema.methods.toJSON = function() {
        return {
          id: this._id,
          email: this.email,
          saldo: this.saldo,
          moneda: this.moneda,
          fechaAuditoria: this.fechaAuditoria
        }
    };

module.exports = mongoose.model("Cuenta", cuentaSchema);
