'use strict'
// IMPORTACIONES
var Usuario = require("../modelos/usuario.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");

function ejemplo(req, res) {
    if (req.user.rol === "ROL_USUARIO") {
        res.status(200).send({ mensaje: `Hola mi nombre es: ${req.user.nombre}` })
    } else {
        res.status(400).send({ mensaje: 'Solo el rol de tipo usuario puede acceder' })
    }

}

function registrar(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    console.log(params);
    if (params.email && params.username && params.password) {
        //     Modelo Base de datos= los datos del cuerpo de datos/formulario
        usuarioModel.nombre = params.nombre;
        usuarioModel.username = params.username;
        usuarioModel.email = params.email;
        usuarioModel.rol = params.rol;
        usuarioModel.imagen = null;

        Usuario.find({
            $or: [
                { username: usuarioModel.username },
                { email: usuarioModel.email }
            ]
        }).exec((err, usuariosEncontrados) => {
            //tiene datos = true || no tiene datos = falso
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuarios' });

            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El usuario ya se encuentra utilizado' });
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) => {

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Guardar Usuario' });

                        if (usuarioGuardado) {
                            res.status(200).send({ usuarioGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el usuario' })
                        }
                    })
                })
            }
        })

    }
}

function obtenerUsuarios(req, res) {

    if(req.user.rol != 'ADMIN_APP'){
        return res.status(500).send({mensaje: 'Solo el rol de tipo ADMIN_APP puede ver los hoteles'})
    }
   

    Usuario.find().exec((err, usuarios) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Usuarios' });
        if (!usuarios) return res.status(500).send({ mensaje: 'Error en la consutla de Usuarios o no tiene datos' });
        return res.status(200).send({ usuarios });

    })
}

function obtenerUsuarioID(req, res) {
    var usuarioId = req.params.idUsuario;

    Usuario.findById(usuarioId, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuario' });
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el Usuario.' });
        return res.status(200).send({ usuarioEncontrado });
    })
}

function usuariosRegistrados(req, res){

    if(req.user.rol != "ADIN_APP"){
        return res.status(500).send({mensaje: 'Solo el rol tipo ADMIN_APP puede ver todos los usuarios'})
    }

    Usuario.find().exec((err, usuarios) =>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion solicitada'});
        if(!usuarios) return res.status(500).send({mensaje: 'Error al obtener los usuarios'});

        return res.status(200).send({usuarios});
    })
}


function login(req, res) {
    var params = req.body;
   
    Usuario.findOne({ email: params.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passVerificada) => {
                if (passVerificada) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        })
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado });
                    }
                } else {
                    return res.status(500).send({ mensaje: 'El usuario no se a podido identificar' });
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'Error al buscar el usuario' });
        }
    })
}

function editarUsuario(req, res) {
    var idUsuario = req.params.id;
    var params = req.body;

    delete params.password;

    if (idUsuario != req.user.sub) {
        return res.status(500).send({ mensaje: 'No posee los permisos para editar ese usuario' });
    }
    
    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(500).send({ mensaje: 'No se a podido editar al Usuario' });

        return res.status(200).send({ usuarioActualizado })
    })
  
}

function editarUsuarioAdmin(req, res) {
    var idUsuario = req.params.id;
    var params = req.body;

    delete params.password;

    if(idUsuario != req.user.sub){
        return res.status(500).send({mensaje: 'Solo puedes editar tu propio usuario.'})
    }
    
    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(500).send({ mensaje: 'No se a podido editar al Usuario' });

        return res.status(200).send({ usuarioActualizado })
    })
  
}

function eliminarUsuario(req, res){
    var idUsuario = req.params.id;

    if(req.user.rol != 'ROL_USUARIO'){
        return res.status(500).send({mensaje: 'Solo el administrador puede editar usuarios.'})
    }

    Usuario.findByIdAndDelete(idUsuario, ((err, usuarioEliminado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEliminado) return res.status(500).send({ mensaje: 'No se a podido eliminar al Usuario' });

        return res.status(200).send({usuarioEliminado})
    }))
}

module.exports = {
    ejemplo,
    registrar,
    usuariosRegistrados,
    login,
    obtenerUsuarios,
    obtenerUsuarioID,
    editarUsuario,
    editarUsuarioAdmin,
    eliminarUsuario
}