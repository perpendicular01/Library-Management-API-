import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server : Server;

const PORT = 5000;

async function main(){
    try{
        // connct to mongoose
        await mongoose.connect('mongodb+srv://pdpepe231:S24DCXuX3QWThmwL@cluster0.t4zjuuz.mongodb.net/libraryManagement?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB');

        // start the express server
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        }

    )}
    catch(err){
        console.error('Error starting the server:', err);
    }
}

main();

