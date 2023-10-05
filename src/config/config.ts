import * as dotenv from "dotenv";

export abstract class ServerConfiguration{

    constructor(){
        const nodeNameEnv: string = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeNameEnv
        });
    }

    /**
     * This function return name of environment.
     * @param key Enviroment variable's name that need search into proccess object.
     * @returns number of server port but in string type.
     */
    public getEnvironment(key: string): string | undefined {
        return process.env[key];
    }
    /**
     * This function transform number port from environment variable to number type.
     * @param key Enviroment variable's name that need search into proccess object.
     * @returns number of port (type number).
     */

    public getNumberPort(key: string): number {
        return Number(this.getEnvironment(key));
    }

    /**
     * This function return environment from we are running server. 
     * If environment is  production this return 'product' if not return ''.
     * @returns name of environment (type string)
     */
    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() || '';
    }

    /**
     * This function is used to create path from wich server will know environment variables.
     * @param path name of environment
     * @returns path of env file (type string)
     */

    public createPathEnv(path: string): string {

        if(path.length === 0){return `.env`;}

        return `${path}.env`;
    }

}
