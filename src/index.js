//require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import {app} from './app.js'
dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!!", err);
})












/*
import express from 'express';
const app = express();
//asunc await
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => { //call back
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch(error){
        console.error("ERRORL ", error);
        throw error
    }
})()
*/