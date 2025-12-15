import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './router';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middlewares setup
app.use(cors({
credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Http server setup 
const server = http.createServer(app);

app.use("/",router());

// Start the server to listen on port 8080
server.listen(8080,() =>{
    console.log('Server is running on http://localhost:8080/');
})

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_HOST! as string);
mongoose.connection.on('error', (error: Error) =>{
    console.log(error);
})
