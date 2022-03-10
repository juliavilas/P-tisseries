
export class World {
    name : string = ""
    logo : string = ""
    money: number = 0
    score: number = 0
    totalangels: number = 0
    activeangels: number = 0
    angelbonus: number = 0
    lastupdate: string = ""
    products : { "product": Product[] };
    allunlocks: { "pallier": Pallier[]};
    upgrades: { "pallier": Pallier[]};
    angelupgrades: { "pallier": Pallier[]};
    managers: { "pallier": Pallier[]};
    static money: any

    constructor() {
        this.products = { "product":[ ] } ;
        this.managers = { "pallier":[ ] };
        this.upgrades = { "pallier":[ ] };
        this.angelupgrades = { "pallier":[ ] };
        this.allunlocks = { "pallier":[ ] };
    }
}

export class Product {

    startFabrication() {
        this.timeleft=this.vitesse;
        this.lastupdate=Date.now();
        this.progressbarvalue=0;
    }

    id : number = 0
    name : string = ""
    logo : string = ""
    cout : number = 0
    croissance: number = 0
    revenu: number = 0
    vitesse: number = 0
    quantite: number = 0
    timeleft: number = 0
    lastupdate: number = 0
    managerUnlocked: boolean = false
    palliers : { "pallier" : Pallier[]};
    progressbarvalue: number = 0

    constructor() {
        this.palliers = { "pallier": [] };
    }

    calcMaxCanBuy(){
        let n = 1;
        // Math.log(1+World.money*(this.croissance-1)/this.cout)/(Math.log(this.croissance));
        return n;
    }

}

export class Pallier {
    name: string = ""
    logo: string = ""
    seuil: number = 0
    idcible: number = 0
    ratio: number = 0
    typeratio: string = ""
    unlocked: boolean = false
}


