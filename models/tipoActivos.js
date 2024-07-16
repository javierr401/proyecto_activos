const mongoose = require('mongoose')

const tipoActivosSchema = new mongoose.Schema({
    nombre: String
})

const TipoActivos = mongoose.model('TipoActivos', tipoActivosSchema)

module.exports = TipoActivos
