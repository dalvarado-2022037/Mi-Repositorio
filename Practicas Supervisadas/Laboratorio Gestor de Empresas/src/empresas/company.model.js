import mongoose, { Schema, model } from 'mongoose'

const companySchema = Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    impactLevel:{
        type: Number,
        required: true
    },
    yearsExperience:{
        type: Date,
        required: true
    },
    businessCategory:{
        type: mongoose.Schema.ObjectId,
        ref: 'category',
        required: true
    }
})

export default model('company', companySchema)