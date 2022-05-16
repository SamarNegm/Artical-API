import mongoose from 'mongoose';

const articalScema = mongoose.Schema({
    title:
    {
        type: String,
    },
    body: {
        type: String,
    },
    comments: [{
        content: String,
        username: String,


    }],
},

    {
        timestamps: true,
    }
)


const Artical = mongoose.model('Artical', articalScema);

export default Artical;


