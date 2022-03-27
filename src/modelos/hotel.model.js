'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombreHotel: String,
    direccion: String,
    descripcionHotel: String,
    puntuacion: String,
    precioPorNoche: Number,
    administrador: {type: Schema.Types.String, ref: 'usuarios'}
});

module.exports = mongoose.model('hotel', HotelSchema);