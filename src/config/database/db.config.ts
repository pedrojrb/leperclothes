import mongoose from 'mongoose'; 

export async function databaseConnection() {
    let retry: number = 0;
    let db;
    try {
    
        while (retry < 3) {
            try {
                if(process.env.DB_URI) {
                    
                    return await mongoose.connect(process.env.DB_URI || '', {
                            connectTimeoutMS: 1000,
                            socketTimeoutMS: 1000
                    });
                   
                
                   
                }
            } catch (error) {
                retry++;
                console.log(error);
            }
        }
    } catch (error) {
        throw new Error(`Error al intentar conectarse a la base de datos ${error}`);
    }

}

export async function disconnectDatabase(){
    await mongoose.connection.close();
}
