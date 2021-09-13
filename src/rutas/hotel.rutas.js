'use strict'

var express = require("express");
var hotelControlador = require("../controladores/hotel.controlador");

var md_autorizacion = require("../middlewares/authenticated");

var api = express.Router();
api.get('/ejemploHotel', md_autorizacion.ensureAuth, hotelControlador.ejemploHotel);
api.post('/registrarHotel', md_autorizacion.ensureAuth, hotelControlador.registrarHotel);
api.get('/obtenerHoteles', hotelControlador.obtenerHoteles);
api.get('/obtenerHotelID/:idHotel', hotelControlador.obtenerHotelID);
api.get('/obtenerHotelNombre', hotelControlador.buscarHotelNombre);
api.get('/obtenerHotelDireccion', hotelControlador.buscarHotelDireccion);
api.get('/usuarioHospedado/:id', md_autorizacion.ensureAuth,hotelControlador.usuarioHospedado);
api.put('/editarHotel/:id', md_autorizacion.ensureAuth, hotelControlador.editarHotel);
api.delete('/eliminarHotel/:id', md_autorizacion.ensureAuth, hotelControlador.eliminarHotel);

module.exports = api;