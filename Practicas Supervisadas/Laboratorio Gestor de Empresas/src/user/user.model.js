import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export default model('user', userSchema)