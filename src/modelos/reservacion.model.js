'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservacionSchema = Schema({
    entrada: String,
    salida: String,
    visitantes: Number
});

module.exports = mongoose.model('reservacion', ReservacionSchema);