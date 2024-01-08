import mongoose, { mongo } from 'mongoose'; 

export async function databaseConnection(): Promise<mongoose.Mongoose | undefined> {
    let retry: number = 0;
    
    try {
    
        while (retry < 3) {
            try {
                if(process.env.DB_URI) {
                    
                    return await mongoose.connect(process.env.DB_URI, {
                            connectTimeoutMS: 1000,
                            socketTimeoutMS: 1000
                    });
                   
                }
            } catch (error) {
                retry++;
            }
        }
    } catch (error) {
        throw new Error(`Error al intentar conectarse a la base de datos ${error}`);
    }

}

export async function disconnectDatabase(){
    await mongoose.connection.close();
}
