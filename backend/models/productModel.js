const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Por favor escribe un nombre de producto"]
    }
    
}, { 
    timestamps: true //con esta linea de codigo de digo a mongoose que cree automaticamente la fecha de creacion del registro (Created at) y modified at
})

module.exports = mongoose.model('Product', productSchema)