// IMPORTACION
const mongoose =  require("mongoose")
const app = require("./app")

mongoose.Promise = global.Promise
mongoose.connect(/*'mongodb+srv://Admin:123añs@hoteles.q0szh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'*/ 'mongodb://localhost:27017/dbHoteles', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Se encuentra conectado a la base de datos');

    app.listen(process.env.PORT || 3000, function () {
        console.log("Servidor corriendo en el puerto 3000");
    })
}).catch(err => console.log(err))