import jwt from 'jsonwebtoken';

export function createToken(arg: object){
    let token: string = '';
    
    if(!process.env.SECRET_TOKEN_KEY){ throw new Error('token key is required');}
    
    token = jwt.sign(arg,process.env.SECRET_TOKEN_KEY, {expiresIn: 900});
    console.log(token);
    return token;
}