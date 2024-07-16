const mongoose = require('mongoose')

const activosSchema = new mongoose.Schema({
    creado: Date,
    compra: Date,
    asignacion: [
        {
            entregado: Date,
            condicionEntrega: String,
            devuelto: Date,
            condicionDevuelto: String,
            empleado: String,
            ubicacion: String
        }
    ],
    factura: String,
    identificador: String,
    nombre: String,
    precio: Number,
    proveedor: String,
    serial: String,
    tipo: String,
    observaciones: [
        {
            descripcion: String,
            tipo: String,
            fecha: Date
        }
    ]
})

const Activos = mongoose.model('Activos', activosSchema)

module.exports = Activos
