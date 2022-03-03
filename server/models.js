const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

//Model for messages
    const messageModel = mongoose.Schema({
         sender :{ type : mongoose.Schema.Types.ObjectId,
                    ref : "User"},
        content :{ type : String, trim : true},
        chat : {type : mongoose.Schema.Types.ObjectId, ref : "Chat"},


    },
    { timestamps : true},
    );

    const Message = mongoose.model('Message', messageModel);
    module.exports = Message;
// Schemas for messaging app will. This will be how users are created

const UserSchema = new mongoose.Schema({

    username: {
        type: String, required: true,
        unique : true
        
    },
    password: {
        type: String,
        required: true
        
    },
});

//Checks to see if password entered matches real password
UserSchema.methods.matchPassword=async function (enteredPassword){
      return await bcrypt.compare(enteredPassword, this.password);
}


// Before saving to database bcrypt will encode the password
UserSchema.pre('save',async function (next) {
   if (!this.isModified) {
       next();

   } 
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password,salt);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;