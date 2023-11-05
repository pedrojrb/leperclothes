const mongoose = require('mongoose');
import * as env from 'dotenv'; 

export async function databaseConnection() {
  try {
    let connection = await mongoose.connect(process.env.DB_URL);

    if(connection){
        console.log('Connecting to database succesfully');
    }
    return connection;

    }catch(error){
        throw error;
    }
}

databaseConnection();


export async function disconnectDatabase(){
    await mongoose.connection.close();
}