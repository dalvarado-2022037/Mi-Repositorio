import mongoose, { Schema, model} from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'categoria',
        required: true
    }
})

export default model('products', productSchema)