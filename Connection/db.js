const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connection established...");
}).catch((err)=>{
    console.log(err);
});
