"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Esize;
(function (Esize) {
    Esize[Esize["S"] = 0] = "S";
    Esize[Esize["XS"] = 1] = "XS";
    Esize[Esize["M"] = 2] = "M";
    Esize[Esize["L"] = 3] = "L";
    Esize[Esize["XL"] = 4] = "XL";
    Esize[Esize["XXL"] = 5] = "XXL";
    Esize[Esize["XXXL"] = 6] = "XXXL";
})(Esize || (Esize = {}));
class CShirt {
    constructor(name, size, stock, color, material, price, gender, image) {
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
    get getTshirt() { return this; }
    ;
    get getTshirtName() { return this.name; }
    ;
    get getTshirtSize() { return this.size; }
    ;
    get getTshirtStock() { return this.stock; }
    ;
    get getTshirtColor() { return this.color; }
    ;
    get getTshirtMaterial() { return this.material; }
    ;
    get getTshirtPrice() { return this.price; }
    ;
    get getTshirtGender() { return this.gender; }
    ;
    get getTshirtImage() { return this.image; }
    ;
    get getTshirtOffer() { return this.offer; }
    ;
    createTshirt(tshirt) { }
    ;
    updateTshirt(tshirt) { }
    ;
    deleteTshirt(tshirt) { }
    ;
    searchTshirtById(id) { }
    ;
    searchTshirtByName(name) { }
    ;
    searchTshirtByColor(color) { }
    ;
    searchTshirtByOffer() { }
    ;
    searchTshirtBySize(size) { }
    ;
}
