'use strict'

var Habitacion = require("../modelos/habitaciones.model");

function ejemploHabitacion(req, res){
    if(req.user.rol === "ROL_USUARIO"){
        res.status(500).send({mensaje: `Hola Mi Nombre es: ${req.user.nombre}`});
    }else{
        res.status(400).send({mensaje: 'Solo el rol tipo usuario puede ver este mensaje'});
    }    
}

function registrarHabitacion(req, res){
    var habitacionModel = new Habitacion();
    var params = req.body;
    console.log(params);

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede agregar habitaciones'});
    }

    if(params.nombreHabitacion && params.descripcionHabitacion && params.hotel){
        habitacionModel.nombreHabitacion = params.nombreHabitacion;
        habitacionModel.descripcionHabitacion = params.descripcionHabitacion;
        habitacionModel.hotel = params.hotel;

        habitacionModel.save((err, habitacionGuardada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion de la habitacion'});
            if(!habitacionGuardada) return res.status(500).send({mensaje: 'Error al agregar la habitacion'});

            return res.status(200).send({habitacionGuardada});
        })
    }
}

function obtenerHabitaciones(req, res){
    
    Habitacion.find().exec((err, habitaciones)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de listar las habitaciones'});
        if(!habitaciones) return res.status(500).send({mensaje: 'Error al mostrar las habitaciones'});

        return res.status(200).send({habitaciones});
    })
}

function obtenerHabitacionID(req, res){
    var habitacionId = req.params.idHabitacion;

    Habitacion.findById(habitacionId, (err, habitacionEncontrada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de obtenere la reservacion'});
        if(!habitacionEncontrada) return res.status(500).send({mensaje:'Error al obtener la habitacion'});

        return res.status(200).send({habitacionEncontrada});
    })
}

function buscarHabitacionHotel(req, res){
    var hotelNombre = req.body;

    if(req.user.rol != "ROL_USUARIO"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ROL_USUARIO puede agregar habitaciones'});
    }

    Habitacion.find(hotelNombre,(err, hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!hotelEncontrado) return res.status(500).send({mensaje: 'Error al buscar el Hotel'});

        return res.status(200).send({hotelEncontrado});
    })
}

function editarHabitacion(req, res){
    var idHabitacion = req.params.id;
    var params = req.body;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede editar una habitacion'});
    }

    Habitacion.findByIdAndUpdate(idHabitacion, params, {new: true}, (err, habitacionActualizada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de editar la habitacion'});
        if(!habitacionActualizada) return res.status(500).send({mensaje: 'Error al actualizar la habitacion'});

        return res.status(200).send({habitacionActualizada});
    })
}

function eliminarHabitacion(req, res){
    var idHabitacion = req.params.id;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede eliminar una habitacion'});
    }

    Habitacion.findByIdAndDelete(idHabitacion, ((err, habitacionEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de eliminar una habitacion'});
        if(!habitacionEliminada) return res.status(500).send({mensaje: 'Erro al eliminar la habitacion'});

        return res.status(200).send({habitacionEliminada});
    }))
}

module.exports = {
    ejemploHabitacion,
    registrarHabitacion,
    obtenerHabitaciones,
    obtenerHabitacionID,
    buscarHabitacionHotel,
    editarHabitacion,
    eliminarHabitacion
}