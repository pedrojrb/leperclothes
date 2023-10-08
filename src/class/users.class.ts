
type TGender = 'MALE' | 'FEMALE' | 'NONBINARY';


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

    get getUser(){ return this;};
    
    get getUsername(){ return this.username;};

    get getName(){ return this.name; };

    get getLastname(){ return this.lastname; };
    
    get getGender(){ return this.gender; };
    
    get getPassword(){ return this.password;};
    
    get getEmail(){ return this.email;};

    get getVerified(){ return this.verified};

    get getEliminated(){ return this.eliminated;};


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