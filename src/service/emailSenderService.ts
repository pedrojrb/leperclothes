import { Resend } from 'resend';
import dotenv from 'dotenv';
import { getHTMLformattedForEmail } from '../config/database/middleware/emailservice.middelwares';



dotenv.config();


interface IEmail {
    from: string,
    to: Array<string>,
    subject: string,
    html: string,
    key: string | undefined,
}

export class Email implements IEmail {
    from: string;
    to: Array<string>;
    subject: string = 'Confirmation code - EleperClothes'; 
    html: string = '';
    key: string | undefined;


    constructor( from: string, to: Array<string>) {
        this.from = from;
        this.to = to;
        this.key = process.env.API_RESEND_KEY ? process.env.API_RESEND_KEY : undefined;
       
    }


    public async sendEmail(email: Email){

        let resend = createKey(this.key);
        let retry: number = 0;

        try{
            while(retry < 3){
                if(resend){

                    return await resend.emails.send({from: email.from,to: email.to, subject: email.subject, html: email.html,  headers: { Authorization: `Bearer ${this.key}`}});
                }
            }
            
        } catch(e){
            retry++;
            throw ('Email send failed: ' + e);
        }
    }
        
        

}

function createKey(key: string | undefined){
    if(key) {
        const resend = new Resend(key)

        if(resend){

            return resend;
        }
        
    };

    throw new Error('Invalid API key');
}