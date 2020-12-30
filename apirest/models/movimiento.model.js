const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let movimientoSchema = new Schema({
  mailDebito: {
    type: String,
    required: [true, "Mail debito es necesario"],
  },
  mailCredito: {
    type: String,
    required: [true, "Mail credito es necesario"],
  },
  importe: {
    type: Number,
    required: [true, "El importe es necesario"],
  },
  fechaMovimiento: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movimiento", movimientoSchema);
