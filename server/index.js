const express =require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const UserSchema = require("./models/user");

// connecting to database
mongoose.connect("mongodb://mongoserver:27017/sampleDB",
  {useNewUrlParser: true, reconnectTries: 2, reconnectInterval:2000 },
  (err) => {
    if(err) {
        console.log("error conencting to mongodb", err);
    }
    else{
        console.log("connected to mongoDB");
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
    console.log("server running on port 3000");
});

app.get("/", (req,res) => {
    res.send("welcome to express");
});

app.get("/users", (req,res) => {
    console.log("in /users GET")
    UserSchema.find({},(err,data) => {
        res.send(data);
    })
})

app.post("/user", (req,res) => {
    console.log("in /user POST")
    const {name} = req.body;
    const user = new UserSchema({
        name
    });
    user.save();
    res.status(200).send("sucsess");
})

