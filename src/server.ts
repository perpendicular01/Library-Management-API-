import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();


let server : Server;



const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI

async function main(){
    try{
        if(!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        
        // connct to mongoose
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // start the express server
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    }
    catch(err){
        console.error('Error starting the server:', err);
    }
}

main();
