'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventoSchema = Schema({
    nombre: String,
    tipoEvento: String, 
    descripcion: String,
    hotel: String
})

module.exports = mongoose.model('eventos', EventoSchema);