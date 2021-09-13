'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var HabitacionSchema = Schema({
    nombreHabitacion: String,
    descripcionHabitacion: String,
    hotel: String
});

module.exports = mongoose.model('habitacion', HabitacionSchema);