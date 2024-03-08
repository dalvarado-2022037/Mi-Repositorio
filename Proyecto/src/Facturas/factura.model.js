import { Schema, model} from "mongoose";

const facturaSchema = Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true        
    },
    data: [{
        product: {
            type: Schema.ObjectId,
            ref: 'product',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }],
    subTotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

export default model('factura', facturaSchema)