const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const chats = require("./data");
const userModel = require("./models");
const userRoutes =  require("./routes/userRoutes");


const apiPort = 3000;

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

app.get("/", (request, response) => {
    response.send("API RUNNING");
  
  });

app.post("/login", userRoutes); //calls login route 

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