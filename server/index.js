const express =require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");s
const UserSchema = require("./models/user");

// connecting to database
mongoose.connect("mongodb://multicontainerappDB1:anurag61@docdb-2019-02-08-07-08-45.cluster-c17ern98ziqh.us-east-1.docdb.amazonaws.com:27017/?ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0",
  (err) => {
    if(err) {
        console.log("error connecting to mongodb", err);
    }
    else{
        console.log("connected to mongoDB");
        
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(4000, () => {
    console.log("server running on port 4000");
});

app.get("/", (req,res) => {
    res.send("welcome to express");
});

app.get("/users", (req,res) => {
    console.log("in /users GET");
    let result = [];
    try{
        UserSchema.find({},(err,data) => {
            res = data;
            res.status(200).send(res)
        });
    }
    catch(e){
        result.status(200).send(e);
    }

})

app.post("/user", (req,res) => {
    console.log("in /user POST")
    const {name} = req.body;
    const user = new UserSchema({
        name
    });
    try{
        user.save((err, data) => {
            if(err){
                res.status(200).send({"message":err})
            }
            else{
                res.status(200).send("success");
            }
        });
    }
    catch(e){
        res.status(200).send(e);
    }
    
})


