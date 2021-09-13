'use strict'

var Reservacion = require("../modelos/reservacion.model");

function ejemploReservacion(req, res){
    if(req.user.rol === 'USUARIO'){
        res.status(200).send({mensaje: `Hola Mi Nombre es: ${req.user.nombre}`});
    }else{
        res.status(400).send({mensaje: 'Solo el rol tipo USUARIO puede ver este mensaje'});
    }
}

function agregarReservacion(req, res){
    var reservacionModel = new Reservacion();
    var params = req.body;

    if(req.user.rol != "ROL_USUARIO"){
        return res.status(500).send({mensaje: "Solo el rol tipo ROL_USUARIO puede hacer reservaciones"});
    }

    if(params.entrada && params.salida && params.visitantes){
        reservacionModel.entrada = params.entrada;
        reservacionModel.salida = params.salida;
        reservacionModel.visitantes = params.visitantes;

        reservacionModel.save((err, reservacionGuardada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion de la Reservacion'});
            if(!reservacionGuardada) return res.status(500).send({mensaje: 'Error al agregar la reservacion'});

            return res.status(200).send({reservacionGuardada});
        })
    }else{
        return res.status(500).send({mensaje: 'Rellene todos los campos necesarios'});
    }
}

function obtenerReservaciones(req, res){

  if(req.user.rol != "ADMIN_HOTEL"){
    return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede ver las reservaciones hechas'});
}

    Reservacion.find().exec((err, reservaciones)=>{
        if(err) return res.status(500).send({mensaje: 'Erro en la peticion de las reservaciones'});
        if(!reservaciones) return res.status(500).send({mensaje: 'Error al obtener las reservaciones'});

        return res.status(200).send({reservaciones});
    })
}

function obtenerReservacionID(req, res){
    var reservacionId = req.params.id;

    Reservacion.findById(reservacionId, (err, reservacionEncontrada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de Reservacion'});
        if(!reservacionEncontrada) return res.status(500).send({mensaje: 'Error al obtener la reservacion'});

        return res.status(200).send({reservacionEncontrada});
    })
}

function editarReservacion(req, res){
    var idReservacion = req.params.id;
    var params = req.body;

    if(req.user.rol != "ADMIN_HOTEL"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede editar las reservaciones hechas'});
    }

    Reservacion.findByIdAndUpdate(idReservacion, params, {new: true}, (err, reservacionActualizada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de editar la reservacion'});
        if(!reservacionActualizada) return res.status(500).send({mensaje: 'Error al editar la reservacion'});

        return res.status(200).send({reservacionActualizada});
    })
}

function eliminarReservacion(req, res){
    var idReservacion = req.params.id;

    if(req.user.rol != "ADMIN_HOTEL"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede eliminar las reservaciones'});
    }

    Reservacion.findByIdAndDelete(idReservacion, ((err, reservacionEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de eliminar la reservacion'});
        if(!reservacionEliminada) return res.status(500).send({mensaje: 'Error al eliminar la reservacion'});

        return res.status(200).send({reservacionEliminada});
    }))
}

module.exports = {
    ejemploReservacion,
    agregarReservacion,
    obtenerReservaciones,
    obtenerReservacionID,
    editarReservacion,
    eliminarReservacion
}