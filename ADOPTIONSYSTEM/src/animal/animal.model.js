'user strict'

import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

const animalSchema = Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    keeper:{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('animal', animalSchema)