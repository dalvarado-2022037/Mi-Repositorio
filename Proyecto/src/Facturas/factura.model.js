import { Schema, model} from "mongoose";

const facturaSchema = Schema({
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