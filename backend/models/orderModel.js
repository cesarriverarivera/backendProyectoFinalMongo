const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Por favor escriba un nombre de producto']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)