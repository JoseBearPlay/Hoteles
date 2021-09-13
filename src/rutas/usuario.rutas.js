'use strict'


var express = require("express");
var usuarioControlador = require("../controladores/usuario.controlador");


var md_autorizacion = require("../middlewares/authenticated");


var api = express.Router();
api.get('/ejemplo', md_autorizacion.ensureAuth ,usuarioControlador.ejemplo);
api.post('/registrar', usuarioControlador.registrar);
api.get('/obtenerUsuarios', md_autorizacion.ensureAuth,usuarioControlador.obtenerUsuarios);
api.get('/obtenerUsuarioId/:idUsuario', usuarioControlador.obtenerUsuarioID);
api.get('/usuariosRegistrados', md_autorizacion.ensureAuth, usuarioControlador.usuariosRegistrados);
api.post('/login', usuarioControlador.login);
api.put('/editarUsuario/:id', md_autorizacion.ensureAuth, usuarioControlador.editarUsuario);
api.put('/editarUsuarioAdmin/:id', md_autorizacion.ensureAuth, usuarioControlador.editarUsuarioAdmin);
api.delete('/eliminarUsuario/:id', md_autorizacion.ensureAuth, usuarioControlador.eliminarUsuario);

module.exports = api;