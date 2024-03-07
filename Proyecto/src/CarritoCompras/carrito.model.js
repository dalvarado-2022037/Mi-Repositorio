import { Schema, model} from "mongoose";

const carritoSchema = Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true        
    },
    products: [{
        type: Schema.ObjectId,
        ref: 'product',
        required: true
    }],
    cantida: [{
        type: Number,
        required: true
    }]
})

export default model('factura', carritoSchema)