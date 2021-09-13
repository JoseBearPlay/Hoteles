'use strict'

var express = require("express");
var habitacionControlador = require("../controladores/habitacion.controlador");

var md_autorizacion = require("../middlewares/authenticated");
 
var api = express.Router();
api.get('/ejemploHabitacion', md_autorizacion.ensureAuth, habitacionControlador.ejemploHabitacion);
api.post('/registrarHabitacion', md_autorizacion.ensureAuth, habitacionControlador.registrarHabitacion);
api.get('/obtenerHabitaciones', habitacionControlador.obtenerHabitaciones);
api.get('/obtenerHabitacionID/:idHabitacion', habitacionControlador.obtenerHabitacionID);
api.get('/buscarHabitacionHotel', md_autorizacion.ensureAuth,habitacionControlador.buscarHabitacionHotel);
api.put('/editarHabitacion/:id', md_autorizacion.ensureAuth, habitacionControlador.editarHabitacion);
api.delete('/eliminarHabitacion/:id', md_autorizacion.ensureAuth, habitacionControlador.eliminarHabitacion);

module.exports = api;