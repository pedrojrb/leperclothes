import jwt, { JwtPayload } from 'jsonwebtoken';

export function createToken(arg: object){
    let token: string = '';
    
    if(!process.env.SECRET_TOKEN_KEY){ throw new Error('token key is required');}
    
    token = jwt.sign(arg,process.env.SECRET_TOKEN_KEY, {expiresIn: 900});
    console.log('createToken: ' + token);
    return token;
}

export function verifyToken(token: string): string | JwtPayload |undefined {
    let data: string |  JwtPayload |undefined;
    if(process.env.SECRET_TOKEN_KEY){
        jwt.verify(token,process.env.SECRET_TOKEN_KEY, (err, payload) => {

            if(err) return err;
            
            data = payload;
        });

        return data;
    }

}