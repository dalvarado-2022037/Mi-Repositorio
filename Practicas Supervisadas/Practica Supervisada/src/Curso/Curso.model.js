'use strict'

import mongoose from 'mongoose'
import { Schema, model} from 'mongoose'

export const cursoSchema = Schema({
    name:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        uppercase: true,
        enum: ['PRIMERO BASICO','SEGUNDO BASICO','TERCERO BASICO',
        'CUARTO DIVERSIFICADO','QUINTO DIVERSIFICADO','SEXTO DIVERSIFICADO'],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('curso',cursoSchema)