const mongoose = require("mongoose");

const connectDB = async() => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_DB, {
               //userNewUrlParser = true,
               //useUnifiedTopology: true,
        } );
        console.log('MongoDB Connected');

    } catch (error){
        console.log('Error :');
        process.exit();
    }
};

module.exports = connectDB;