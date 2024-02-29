import mongoose from 'mongoose'

const publicacionSchema = mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    categoría:{
        type: String,
        required: true,
        uppercase: true,
        enum: ['INFORMATION',
            'ENTERTAINMENT',
            'EDUCATIONAL',
            'OPINION',
            'SPORTS',
            'ART AND CULTURE']
    },
    textoprincipal:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

export default mongoose.model('publication', publicacionSchema)