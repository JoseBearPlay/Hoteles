'use strict'

var mongoose = require("mongoose");
var Schema  = mongoose.Schema;

var ServicioSchema = Schema({
    nombre: String,
    descripcion: String
});

module.exports = mongoose.model('servicios', ServicioSchema);