'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FacturaSchema = Schema({
    nombreHotel: String,
    direccionHotel: String,
    nombreUsuario: String,
    fecha: String,
    numeroFactura: Number,
    serie: String,
    serviciosHospedado: String,
    precioServicios: Number,
    precioHospedaje: Number,
    diasHospedado: Number,
    total: Number
})

module.exports = mongoose.model('facturas', FacturaSchema);