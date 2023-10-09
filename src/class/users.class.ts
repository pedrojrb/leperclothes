
export type TGender = 'MALE' | 'FEMALE' | 'NONBINARY';


interface IUser {
    username: string,
    name: string,
    lastname: string,
    gender: TGender,
    email: string,
}

export  class User implements IUser {
    public username: string;
    public name: string;
    public lastname: string;
    public gender: TGender;
    private password: string;
    public email: string;
    private eliminated: boolean;
    private verified: boolean;

    constructor(username: string, name: string, lastname: string, gender: TGender, password: string, email: string) {
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.gender = gender;
        this.password = password;
        this.email = email;
        this.eliminated = false;
        this.verified = false;
    }

    private get getUser(){ return this;};
    
    private get getUsername(){ return this.username;};

    private get getName(){ return this.name; };

    private get getLastname(){ return this.lastname; };
    
    private get getGender(){ return this.gender; };
    
    private get getPassword(){ return this.password;};
    
    private get getEmail(){ return this.email;};

    private get getVerified(){ return this.verified};

    private get getEliminated(){ return this.eliminated;};


    public updateUser(user: User): void{
        //TODO: Connection to database anda Search in database user to update.
    };

    public createUser(user: User): void{
        //TODO: Connection to database and create new user.
    }
    
    public searchUserById(user: User): void {
        //TODO: Connection to database and search by id.
    };

    public searchUserByUsername(username: string): void {
        //TODO: Connection to database and search by username.
    }

    public deleteUser( user: User): void{
         //TODO: Connection to database anda Search in database user to deleted and update eliminated property.
    };

    
}