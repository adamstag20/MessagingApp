const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const chats = require("./data");
const userModel = require("./models");
const userRoutes =  require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");



const apiPort = 5000;

// CONNECTS TO MONGODB DATABASE
mongoose.connect(process.env.MONGO_DB,
    {
        //useNewUrlParser: true,
        //useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: " ));
db.once("open", function () {
    console.log("connected successfully");
});

app.use(express.json()); //to accept json data



app.post("/login", userRoutes); //calls login route 
app.get("/chat", userRoutes);
app.post("/api/chat", chatRoutes);
app.get("/api/chat", chatRoutes);
app.post("/group", chatRoutes);
app.get("/users",userRoutes);
app.use("/api/messages", messageRoutes);

//app.user(notFound);
//app.user(errorHandler);

app.post("/add_user", async(request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.listen(apiPort, console.log(`Server running on port ${apiPort}`));

module.exports = app;