
import { TGender } from "./users.class";

enum Esize {
    'S',
    'XS',
    'M',
    'L',
    'XL',
    'XXL',
    'XXXL'
}

type Tcolor = 'RED' | 'GREEN' | 'BLUE' | 'BLACK' | 'WHITE' | 'PURPLE' |'VIOLET'|'YELLOW'|'ORANGE'|'PINK'|'BROWN'|'GREY' |'CUSTOM';


type TshirtSize = Esize;

type TContentType = 'image/jpeg' | 'image/png';

interface Iimage{
    name: string;
    data: Buffer;
    contentType: TContentType;
}
interface Ishirt{
    name: string;
    size: TshirtSize;
    stock: number;
    color: Tcolor;
    material: string;
    price: number;
    gender: TGender;
    image: Iimage;
    offer: number;
}

class CShirt implements Ishirt {
    public name: string;
    public size: TshirtSize;
    public stock: number;
    public color: Tcolor;
    public material: string;
    public price: number;
    public gender: TGender;
    public image: Iimage;
    public offer: number;

    constructor(name: string, size: TshirtSize , stock: number, color: Tcolor, material:string, price: number, gender: TGender, image: Iimage){
        this.name = name;
        this.size = size;
        this.stock = stock;
        this.color = color;
        this.material = material;
        this.price = price;
        this.gender = gender;
        this.image = image;
        this.offer = 0;
    }

    public get getTshirt(){ return this};

    public get getTshirtName(){ return this.name};

    public get getTshirtSize(){ return this.size};

    public get getTshirtStock(){ return this.stock};

    public get getTshirtColor(){ return this.color};

    public get getTshirtMaterial(){ return this.material};

    public get getTshirtPrice(){ return this.price};

    public get getTshirtGender(){ return this.gender};

    public get getTshirtImage(){ return this.image};

    public get getTshirtOffer(){ return this.offer};

    public createTshirt(tshirt: CShirt){};

    public updateTshirt(tshirt: CShirt){};

    public deleteTshirt(tshirt: CShirt){};

    public searchTshirtById(id: string){};
    
    public searchTshirtByName(name: string){};

    public searchTshirtByColor(color: Tcolor){};

    public searchTshirtByOffer(){};

    public searchTshirtBySize(size:TshirtSize){};


}