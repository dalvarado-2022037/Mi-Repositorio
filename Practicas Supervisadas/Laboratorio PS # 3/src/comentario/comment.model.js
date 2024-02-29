import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    publication: {
        type: mongoose.Schema.ObjectId,
        ref: 'publication',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    deslike: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('comment', commentSchema)