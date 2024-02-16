import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true, // Solo puede existir un registreo único
        lowercase: true
    },
    password: {
        type: String,
        miniLength: [8, 'Password must be 8 characters'],
        required: true
    },
    phone: {
        type: String,
        miniLength: 8,
        maxLength: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN','CLIENT'],//Solo los datos que estén en el arreglo son válidos
        required: true
    }
})


//Pre mongoose /line 32
                            //pluralizar
export default mongoose.model('user', userSchema)