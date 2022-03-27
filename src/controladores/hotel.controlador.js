'use strict'

var Hotel = require("../modelos/hotel.model");
var Usuario = require("../modelos/usuario.model");

function ejemploHotel(req, res){
    if (req.user.rol === "ADMIN") {
        res.status(200).send({ mensaje: `Hola Mi Nombre es: ${req.user.nombre}`})
    }else{
        res.status(400).send({ mensaje: 'Solo el rol tipo Admin puede ver este mensaje.'})
    }
}

function registrarHotel(req, res){
    var hotelModel = new Hotel();
    var usuarioModel = new Usuario();
    var params = req.body;
    
    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: "Solo el rol tipo ADMIN_APP puede agregar Hoteles"});
    }

    if(params.nombreHotel && params.direccion && params.descripcionHotel){
        hotelModel.nombreHotel = params.nombreHotel;
        hotelModel.direccion = params.direccion;
        hotelModel.descripcionHotel = params.descripcionHotel;
        hotelModel.puntuacion = params.puntuacion;
        hotelModel.precioPorNoche = params.precioPorNoche,
        hotelModel.administrador = params.administrador

        
        hotelModel.save((err, hotelGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion del Hotel'});
            if(!hotelGuardado) return res.status(500).send({ mensaje: 'Error al agregar el Hotel'});

            return res.status(200).send({ hotelGuardado });
        })
    }else{
        return res.status(500).send({mensaje: "Relle todos los datos necesarios"});
    }
}



function obtenerHoteles(req, res){
    
    Hotel.find().exec((err, hoteles)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!hoteles) return res.status(500).send({mensaje:'Error al obtener los hoteles'});

        return res.status(200).send({hoteles});
    })
}

function obtenerHotelID(req, res){
    var hotelId = req.params.idHotel;

    Hotel.findById(hotelId, (err, hotelEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!hotelEncontrado) return res.status(500).send({mensaje:'Error al obtener el hoteles'});

        return res.status(200).send({hotelEncontrado});
    })
}

function buscarHotelNombre(req, res){
    var hotelNombre = req.body;


    Hotel.findOne(hotelNombre,(err, hotelNombreEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!hotelNombreEncontrado) return res.status(500).send({mensaje: 'Error al buscar el Hotel'});

        return res.status(200).send({hotelNombreEncontrado});
    })
}

function buscarHotelDireccion(req, res){
    var hotelDireccion = req.body;


    Hotel.findOne(hotelDireccion,(err, hotelDireccionEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!hotelDireccionEncontrado) return res.status(500).send({mensaje:'Error al obtener el Hotel'});

        return res.status(200).send({hotelDireccionEncontrado});
    })
}

function usuarioHospedado(req,res){
    var idUsuario = req.params.id;

    if(req.user.rol != "ADMIN_HOTEL"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_HOTEL puede ver las reservaciones hechas'});
    }

    Usuario.findById(idUsuario, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Erro en la peticion solicitada'});
        if(!usuarioEncontrado) return res.status(500).send({mensaje: 'Error al obtener el usuario hospedado'});

        return res.status(200).send({usuarioEncontrado});
    })
}


function editarHotel(req, res){
    var idHotel = req.params.id;
    var params = req.body;

    if(req.user.rol != "ADMIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede editar un hotel'});
    }

    Hotel.findByIdAndUpdate(idHotel, params, {new: true}, (err, hotelEditado)=>{
        if(err) return res.status(500).send({mensaje: 'Erro en la peticion hoteles'});
        if(!hotelEditado) return res.status(500).send({mensaje: 'Error al editar el hotel'});

        return res.status(200).send({hotelEditado});
    })
}

function eliminarHotel(req, res){
    var idHotel = req.params.id;

    if(req.user.rol != 'ADMIN_APP'){
        return res.status(500).send({mensaje: 'Solo el rol de tipo ADMIN_APP puede eliminar un hotel'});
    }

    Hotel.findByIdAndDelete(idHotel, (err, hotelEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de eliminar el hotel'});
        if(!hotelEliminado) return res.status(500).send({mensaje: 'Error al eliminar el hotel'});

        return res.status(200).send({hotelEliminado});
    })
}




module.exports = {
    ejemploHotel,
    registrarHotel,
    obtenerHoteles,
    obtenerHotelID,
    buscarHotelNombre,
    buscarHotelDireccion,
    usuarioHospedado,
    editarHotel,
    eliminarHotel
}