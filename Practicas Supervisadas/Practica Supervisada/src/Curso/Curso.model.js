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
    teacher:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

export default model('curso',cursoSchema)