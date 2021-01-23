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
    type: String,
    default: formatDate(),
  },
  fechaAuditoria: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movimiento", movimientoSchema);

function formatDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
