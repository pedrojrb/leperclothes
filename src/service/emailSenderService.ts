import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

let resend: Resend;

function createKey(key: string | undefined){

    if(key) resend = new Resend(key);

    throw new Error('Invalid API key');
}
interface IEmail {
    from: string,
    to: string,
    subject: string,
    html: string,    
}

class Email implements IEmail {
    from: string;
    to: string;
    subject: string;
    html: string;


    constructor( from: string, to: string, subject:string, html: string) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = html;
        createKey(process.env.API_RESEND_KEY);
    }


    private async sendEmail(email: Email){
        let retry: number = 0;
        try{
            while(retry < 3){
                return await resend.emails.send(email);
            }
            
        } catch(e){
            retry++;
            throw ('Email send failed: ' + e);
        }
    }
        
        

}