import * as fs from 'fs';

export class Hero{
    "nom":string;
    "type":string;
    "actif":boolean;
};

export class HeroType{
    "code":string;
    "libelle":string;
}

export class HeroHelper{
    
    static  getAllHeroType():Array<HeroType>
    {
        return [{
            code:"mage",
            libelle:"Mage"
        },
        {
            code:"ingenieur",
            libelle:"Ingénieur"
        }];
    }  

    static getAllHero(actif:boolean=true) : Array<Hero>
    {
        return [{
            nom:"yyyyyy",
            type:"mage",
            actif:true
        }]
    }

}
