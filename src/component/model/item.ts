export class Item{
    "libelle":string;
    "region":string;
    "origine":string;
    "prix" : number;
    "basePourcentage":number;
    "categorie" : Categorie;
    "degats":string;
    "courage":string;
    "intelligence":string;
    "charisme":string;
    "adresse":string;
    "force":string;
    "chance":string;
    "attaque":string;
    "parade":string;
    "rupture":string;
    "informations":string="";
};

export class Categorie{
    "code":number;
    "libelle":string;
}

export class ItemHelper{
    
    static getAll():Array<Item>{
        return [
            {
                "libelle":"Epée perave",
                "basePourcentage":100,
                "region":"commun",
                "origine":"commun",
                "categorie":{
                    "code":1,
                    "libelle" : "Armes à 1 main"
                },
                "prix":50,
                "degats":"1D+3",
                "courage":"-1",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-1",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Epée de qualité",
                "basePourcentage":100,
                "region":"commun",
                "origine":"commun",
                "categorie":{
                    "code":1,
                    "libelle" : "Armes à 1 main"
                },
                "prix":400,
                "degats":"1D+5",
                "courage":"-1",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-1",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Hache de bataille Sylderine",
                "basePourcentage":80,
                "region":"commun",
                "origine":"commun",
                "categorie":{
                    "code":2,
                    "libelle" : "Armes à 2 mains - Haches"
                },
                "prix":3000,
                "degats":"2D+6",
                "courage":"4",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-1",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Arc des meuldor",
                "basePourcentage":100,
                "region":"commun",
                "origine":"elfe",
                "categorie":{
                    "code":3,
                    "libelle" : "Armes de jets"
                },
                "prix":800,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Hallebarde légendaire",
                "basePourcentage":10,
                "region":"commun",
                "origine":"nain",
                "categorie":{
                    "code":4,
                    "libelle" : "Arme à 2 mains - Lances"
                },
                "prix":2000,
                "degats":"1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"2",
                "parade":"",
                "rupture":"1-4",
                "informations":"dégat *2 sur les humains"
            }
        ];
    }
}