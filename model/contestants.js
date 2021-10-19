const mongoose = require('mongoose')
const { nanoid } = require('nanoid')




const contestantsSchema = new mongoose.Schema({


    id:{
        type:String
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    costumeTitle: {
        type: String,
        required: [true, 'costumeTitle is Required']

    },
    costumeImgUrl: {
        type: String,
        required: [true, 'costumeImgUrl is Required']
    },
    city: {
        type: String,
        required: [true, 'city is Required']
    },
    country: {
        type: String,
        required: [true, 'country is Required']
    },
    votes: {
        type: Number,
        default:0

    }

})


const Contestants = mongoose.model('contestants', contestantsSchema)
module.exports = Contestants;