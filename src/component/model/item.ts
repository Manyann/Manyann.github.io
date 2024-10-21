export class Item{
    "libelle":string;
    "region":string;
    "origine":string;
    "prix" : number;
    "basePourcentage":number;
    "categorie" : Categorie;
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

export class Arme extends Item{
    "degats":string;
}

export class Armure extends Item{
    "armure":string;
}

export class Categorie{
    "code":string;
    "libelle":string;
}

export class ItemHelper{

    private static origines: { [outerKey: string]: { [innerKey: number]: string } } = {
        "dague" : {
            0:"elfe",
        },
        "epee" : {
            0:"elfe",
            1:"pirate",
        },
        "hache" : {
            0:"nain",
            1:"orc",
        },
        "masse" : {
            0:"nain",
        },
        "hache-deux" : {
            0:"orc",
        },
        "marteau" : {
            0:"nain",
        },
        "lance" : {
            0:"orc",
        },
        "arc" : {
            0:"elfe",
        },
        "arbalete" : {
            0:"homme-sable",
        },
        "javelot" : {
            0:"orc",
        },
        "pistolet" : {
            0:"homme-sable",
            1:"pirate",
        },
        "baton" :{
            0:'elfe',
            1:'orc'
        },
        "grimoire" :{
            0:'elfe',
        },
        "bouclier" :{
            0:'elfe',
            1:'orc',
            2:'nain'
        },
        "armure-cuir":{
            0:'elfe',
            1:'orc',
            2:'pirate'
        },
        "armure-maille":{
            0:'elfe',
            1:'orc',
            2:'nain'
        } ,
        "armure-plaque":{
            0:'nain',
            1:'orc',
        },
        "robe":{
            0:'elfe',
            1:'homme-sable',
        },
        "chapeau":{
            0:'elfe',
            1:'homme-sable',
        }


    };

    private static getOrigine(armeType:string):string{
        let dico = this.origines[armeType];
        let originesCount = Object.keys(dico).length;
        let max = originesCount * 10;

        let random = Math.floor(Math.random() * (max - 0 + 1)) + 0;
        if(random >= originesCount){
            return "commun";
        }

        return dico[random];
    }

    static getDefaultArme() : Arme{
        return {
            "libelle":"",
            "basePourcentage":0,
            "region":"commun",
            "origine":"",
            "categorie":{
                "code":"",
                "libelle" : ""
            },
            "prix":0,
            "degats":"",
            "courage":"",
            "intelligence":"",
            "charisme":"",
            "adresse":"",
            "force":"",
            "chance":"",
            "attaque":"",
            "parade":"",
            "rupture":"",
            "informations":""
            
        };
    }
    
    static getDefaultArmure() : Armure{
        return {
            "libelle":"",
            "basePourcentage":0,
            "region":"commun",
            "origine":"",
            "categorie":{
                "code":"",
                "libelle" : ""
            },
            "prix":0,
            "armure":"",
            "courage":"",
            "intelligence":"",
            "charisme":"",
            "adresse":"",
            "force":"",
            "chance":"",
            "attaque":"",
            "parade":"",
            "rupture":"",
            "informations":""
            
        };
    }
    
    static getAll():Array<Arme>{
        return [
            //#region  Dagues
            {
                "libelle":"Dague pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":100,
                "degats":"1D+2",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Dague de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":200,
                "degats":"1D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Dague de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":400,
                "degats":"1D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"+1",
                "parade":"-1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Dague d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":700,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"+1",
                "parade":"-1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Dague Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":1000,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"+2",
                "parade":"-1",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Dague d'excellence",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":1500,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"+2",
                "parade":"0",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Dague de combat",
                "basePourcentage":45,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":1500,
                "degats":"1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"+1",
                "parade":"-1",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Dague éthérée",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("dague"),
                "categorie":{
                    "code":"dague",
                    "libelle" : "Dagues"
                },
                "prix":2000,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"2",
                "force":"",
                "chance":"",
                "attaque":"+2",
                "parade":"0",
                "rupture":"*",
                "informations":"Dégats magique"
            },
            //#endregion Dagues
            //#region Epee
            {
                "libelle":"Epée pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":100,
                "degats":"1D+3",
                "courage":"-1",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-1",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Epée de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":200,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Epée de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":400,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Epée d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":700,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Rapière de Noble",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":800,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Epée Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":1000,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"+1",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Lame d'excellence",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":1500,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"+1",
                "parade":"+1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Lame de combat",
                "basePourcentage":45,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":2000,
                "degats":"1D+7",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Lame de dueliste",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("epee"),
                "categorie":{
                    "code":"epee",
                    "libelle" : "Epées 1 main"
                },
                "prix":2500,
                "degats":"1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"+2",
                "parade":"+1",
                "rupture":"1",
                "informations":""
            },
            //#endregion Epees
            //#region Haches 1 main
            {
                "libelle":"Hache pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("hache"),
                "categorie":{
                    "code":"hache",
                    "libelle" : "Haches 1 main"
                },
                "prix":100,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-2",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Hache de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("hache"),
                "categorie":{
                    "code":"hache",
                    "libelle" : "Haches 1 main"
                },
                "prix":200,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Hache de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("hache"),
                "categorie":{
                    "code":"hache",
                    "libelle" : "Haches 1 main"
                },
                "prix":400,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Hache d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("hache"),
                "categorie":{
                    "code":"hache",
                    "libelle" : "Haches 1 main"
                },
                "prix":700,
                "degats":"1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Hache Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("hache"),
                "categorie":{
                    "code":"hache",
                    "libelle" : "Haches 1 main"
                },
                "prix":1000,
                "degats":"2D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Hache d'excellence",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("hache"),
                "categorie":{
                    "code":"hache",
                    "libelle" : "Haches 1 main"
                },
                "prix":1500,
                "degats":"2D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"+1",
                "parade":"0",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Hache de combat",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("hache"),
                "categorie":{
                    "code":"hache",
                    "libelle" : "Haches 1 main"
                },
                "prix":2000,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"+1",
                "parade":"-1",
                "rupture":"1-2",
                "informations":""
            },
            //#endregion Haches 1 main
            //#region Masses
            {
                "libelle":"Masse pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("masse"),
                "categorie":{
                    "code":"masse",
                    "libelle" : "Masses"
                },
                "prix":100,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-3",
                "rupture":"1-4",
                "informations":"1/20 chance d'infliger -1PR"
                
            },
            {
                "libelle":"Masse de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("masse"),
                "categorie":{
                    "code":"masse",
                    "libelle" : "Masses"
                },
                "prix":200,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-2",
                "rupture":"1-3",
                "informations":"1/12 chance d'infliger -1PR"
            },
            {
                "libelle":"Masse de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("masse"),
                "categorie":{
                    "code":"masse",
                    "libelle" : "Masses"
                },
                "prix":400,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-2",
                "rupture":"1-3",
                "informations":"1/12 chance d'infliger -1PR"
            },
            {
                "libelle":"Masse d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("masse"),
                "categorie":{
                    "code":"masse",
                    "libelle" : "Masses"
                },
                "prix":700,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1-3",
                "informations":"1/10 chance d'infliger -1PR"
            },
            {
                "libelle":"Masse Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("masse"),
                "categorie":{
                    "code":"masse",
                    "libelle" : "Masses"
                },
                "prix":1000,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1-2",
                "informations":"1/8 chance d'infliger -1PR"
            },
            {
                "libelle":"Masse de combat",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("masse"),
                "categorie":{
                    "code":"masse",
                    "libelle" : "Masses"
                },
                "prix":1500,
                "degats":"1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1-2",
                "informations":"1/6 chance d'infliger -1PR"
            },
            {
                "libelle":"Masse d'Angmar",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("masse"),
                "categorie":{
                    "code":"masse",
                    "libelle" : "Masses"
                },
                "prix":2000,
                "degats":"1D+6",
                "courage":"1",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-1",
                "rupture":"1",
                "informations":"1/6 chance d'infliger -2PR"
            },
            //#endregion Masses
            //#region Haches 2 mains
            {
                "libelle":"Hache pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("hache-deux"),
                "categorie":{
                    "code":"hache-deux",
                    "libelle" : "Haches à 2 mains"
                },
                "prix":200,
                "degats":"2D+1",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-3",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Hache de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("hache-deux"),
                "categorie":{
                    "code":"hache-deux",
                    "libelle" : "Haches à 2 mains"
                },
                "prix":350,
                "degats":"2D+2",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-3",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Hache de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("hache-deux"),
                "categorie":{
                    "code":"hache-deux",
                    "libelle" : "Haches à 2 mains"
                },
                "prix":500,
                "degats":"2D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-3",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Hache d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("hache-deux"),
                "categorie":{
                    "code":"hache-deux",
                    "libelle" : "Haches à 2 mains"
                },
                "prix":700,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-3",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Hache Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("hache-deux"),
                "categorie":{
                    "code":"hache-deux",
                    "libelle" : "Haches à 2 mains"
                },
                "prix":1000,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-2",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Hache de combat",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("hache-deux"),
                "categorie":{
                    "code":"hache-deux",
                    "libelle" : "Haches à 2 mains"
                },
                "prix":1500,
                "degats":"2D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"-1",
                "parade":"-3",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Hache double",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("hache-deux"),
                "categorie":{
                    "code":"hache-deux",
                    "libelle" : "Haches à 2 mains"
                },
                "prix":2000,
                "degats":"2D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-2",
                "rupture":"1",
                "informations":""
            },
            //#endregion Haches 2 mains
            //#region Marteaux 2 mains
            {
                "libelle":"Marteau pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("marteau"),
                "categorie":{
                    "code":"marteau",
                    "libelle" : "Marteaux à 2 mains"
                },
                "prix":200,
                "degats":"2D",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-3",
                "parade":"-3",
                "rupture":"1-4",
                "informations":"1/12 chance d'infliger -1PR"
                
            },
            {
                "libelle":"Marteau de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("marteau"),
                "categorie":{
                    "code":"marteau",
                    "libelle" : "Marteaux à 2 mains"
                },
                "prix":350,
                "degats":"2D+2",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"-3",
                "rupture":"1-3",
                "informations":"1/10 chance d'infliger -1PR"
            },
            {
                "libelle":"Marteau de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("marteau"),
                "categorie":{
                    "code":"marteau",
                    "libelle" : "Marteaux à 2 mains"
                },
                "prix":500,
                "degats":"2D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"-3",
                "rupture":"1-3",
                "informations":"1/8 chance d'infliger -1PR"
            },
            {
                "libelle":"Marteau d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("marteau"),
                "categorie":{
                    "code":"marteau",
                    "libelle" : "Marteaux à 2 mains"
                },
                "prix":700,
                "degats":"2D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"-3",
                "rupture":"1-3",
                "informations":"1/6 chance d'infliger -1PR"
            },
            {
                "libelle":"Marteau Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("marteau"),
                "categorie":{
                    "code":"marteau",
                    "libelle" : "Marteaux à 2 mains"
                },
                "prix":1000,
                "degats":"2D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"-2",
                "rupture":"1-2",
                "informations":"1/6 chance d'infliger -1PR"
            },
            {
                "libelle":"Marteau de combat",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("marteau"),
                "categorie":{
                    "code":"marteau",
                    "libelle" : "Marteaux à 2 mains"
                },
                "prix":1500,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"-2",
                "parade":"-3",
                "rupture":"1-2",
                "informations":"1/4 chance d'infliger -1PR"
            },
            {
                "libelle":"Marteau de destruction",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("marteau"),
                "categorie":{
                    "code":"marteau",
                    "libelle" : "Marteaux à 2 mains"
                },
                "prix":2000,
                "degats":"2D+5",
                "courage":"1",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"-3",
                "rupture":"1",
                "informations":"1/4 chance d'infliger -2PR"
            },
            //#endregion Marteaux 2 mains
            //#region Lances
            
            {
                "libelle":"Lance pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("lance"),
                "categorie":{
                    "code":"lance",
                    "libelle" : "Lances"
                },
                "prix":200,
                "degats":"2D",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-3",
                "rupture":"1-5",
                "informations":"1/20 d'ignorer PR"
                
            },
            {
                "libelle":"lance de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("lance"),
                "categorie":{
                    "code":"lance",
                    "libelle" : "Lances"
                },
                "prix":350,
                "degats":"2D+1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"-2",
                "rupture":"1-4",
                "informations":"1/12 d'ignorer PR"
            },
            {
                "libelle":"Lance de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("lance"),
                "categorie":{
                    "code":"lance",
                    "libelle" : "Lances"
                },
                "prix":500,
                "degats":"2D+2",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-2",
                "rupture":"1-4",
                "informations":"1/10 d'ignorer PR"
            },
            {
                "libelle":"Lance d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("lance"),
                "categorie":{
                    "code":"lance",
                    "libelle" : "Lances"
                },
                "prix":700,
                "degats":"2D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"0",
                "parade":"-2",
                "rupture":"1-3",
                "informations":"1/10 d'ignorer PR"
            },
            {
                "libelle":"Lance Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("lance"),
                "categorie":{
                    "code":"lance",
                    "libelle" : "Lances"
                },
                "prix":1000,
                "degats":"2D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"+1",
                "parade":"-2",
                "rupture":"1-3",
                "informations":"1/8 d'ignorer PR"
            },
            {
                "libelle":"Lance de combat",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("lance"),
                "categorie":{
                    "code":"lance",
                    "libelle" : "Lances"
                },
                "prix":1500,
                "degats":"2D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"0",
                "parade":"-2",
                "rupture":"1-3",
                "informations":"1/6 d'ignorer PR"
            },
            {
                "libelle":"Lance de précision",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("lance"),
                "categorie":{
                    "code":"lance",
                    "libelle" : "Lances"
                },
                "prix":2000,
                "degats":"2D+4",
                "courage":"1",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"+1",
                "parade":"-2",
                "rupture":"1-2",
                "informations":"1/4 d'ignorer PR"
            },
            //#endregion Lances
            //#region Arc
            {
                "libelle":"Arc pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":50,
                "degats":"1D",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"-3*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
                
            },
            {
                "libelle":"Arc de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":100,
                "degats":"1D+2",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-3*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Arc de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":150,
                "degats":"1D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-2*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Arc d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":500,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-1*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Arc Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":800,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Arc d'excellence",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":1000,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Arc de précision",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":1500,
                "degats":"1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Arc d'yggdrasil",
                "basePourcentage":35,
                "region":"commun",
                "origine":this.getOrigine("arc"),
                "categorie":{
                    "code":"arc",
                    "libelle" : "Arcs"
                },
                "prix":2000,
                "degats":"1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"2",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"*",
                "informations":""
            },
            //#endregion Arcs
            //#region Arbaletes
            {
                "libelle":"Arbalète pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":100,
                "degats":"2D",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"-3*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":"-3 à l'esquive"
                
            },
            {
                "libelle":"Arbalète de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":200,
                "degats":"2D+1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-2*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"-3 à l'esquive"
            },
            {
                "libelle":"Arbalète de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":400,
                "degats":"2D+3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-1*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"-4 à l'esquive"
            },
            {
                "libelle":"Arbalète d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":800,
                "degats":"2D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"-4 à l'esquive"
            },
            {
                "libelle":"Arbalète Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":1200,
                "degats":"2D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":"-5 à l'esquive"
            },
            {
                "libelle":"Arbalète d'excellence",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":1500,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":"-5 à l'esquive"
            },
            {
                "libelle":"Arbalète de combat",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":2000,
                "degats":"2D+7",
                "courage":"1",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":"-5 à l'esquive"
            },
            {
                "libelle":"Arbalète d'immobilisation",
                "basePourcentage":35,
                "region":"commun",
                "origine":this.getOrigine("arbalete"),
                "categorie":{
                    "code":"arbalete",
                    "libelle" : "Arbalètes"
                },
                "prix":2000,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1",
                "informations":"-7 à l'esquive"
            },
            //#endregion Arbaletes
            //#region Javelots
            {
                "libelle":"Javelot pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("javelot"),
                "categorie":{
                    "code":"javelot",
                    "libelle" : "Javelots"
                },
                "prix":200,
                "degats":"1D+2",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-5",
                "parade":"-5",
                "rupture":"1-5",
                "informations":"1/12 chance de faire tomber à terre"
                
            },
            {
                "libelle":"Javelot de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("javelot"),
                "categorie":{
                    "code":"javelot",
                    "libelle" : "Javelots"
                },
                "prix":350,
                "degats":"1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-",
                "force":"",
                "chance":"",
                "attaque":"-4",
                "parade":"-4",
                "rupture":"1-4",
                "informations":"1/8 chance de faire tomber à terre"
            },
            {
                "libelle":"Javelot de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("javelot"),
                "categorie":{
                    "code":"javelot",
                    "libelle" : "Javelots"
                },
                "prix":500,
                "degats":"1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-",
                "force":"",
                "chance":"",
                "attaque":"-4",
                "parade":"-4",
                "rupture":"1-4",
                "informations":"1/6 chance de faire tomber à terre"
            },
            {
                "libelle":"Javelot d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("javelot"),
                "categorie":{
                    "code":"javelot",
                    "libelle" : "Javelots"
                },
                "prix":700,
                "degats":"1D+7",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-",
                "force":"",
                "chance":"",
                "attaque":"-4",
                "parade":"-4",
                "rupture":"1-4",
                "informations":"1/4 chance de faire tomber à terre"
            },
            {
                "libelle":"Javelot Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("javelot"),
                "categorie":{
                    "code":"javelot",
                    "libelle" : "Javelots"
                },
                "prix":1000,
                "degats":"1D+7",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-4",
                "parade":"-4",
                "rupture":"1-3",
                "informations":"1/3 chance de faire tomber à terre"
            },
            {
                "libelle":"Javelot d'excellence",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("javelot"),
                "categorie":{
                    "code":"javelot",
                    "libelle" : "Javelots"
                },
                "prix":1500,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"-4",
                "parade":"-4",
                "rupture":"1-3",
                "informations":"1/4 chance de faire tomber à terre"
            },
            {
                "libelle":"Javelot de combat",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("javelot"),
                "categorie":{
                    "code":"javelot",
                    "libelle" : "Javelots"
                },
                "prix":2000,
                "degats":"2D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"-3",
                "parade":"-3",
                "rupture":"1-2",
                "informations":"1/2 chance de faire tomber à terre"
            },
            //#endregion Javelots
            //#region Armes à feu  
            {
                "libelle":"Pistolet pérave",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("pistolet"),
                "categorie":{
                    "code":"pistolet",
                    "libelle" : "Armes à feu"
                },
                "prix":350,
                "degats":"1D+2/1D+4",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":"Impossible de parer avec"
                
            },
            {
                "libelle":"Pistolet de qualité correcte",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("pistolet"),
                "categorie":{
                    "code":"pistolet",
                    "libelle" : "Armes à feu"
                },
                "prix":500,
                "degats":"1D+3/1D+5",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Impossible de parer avec"
            },
            {
                "libelle":"Pistolet de bonne qualité",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("pistolet"),
                "categorie":{
                    "code":"pistolet",
                    "libelle" : "Armes à feu"
                },
                "prix":750,
                "degats":"1D+4/1D+6",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Impossible de parer avec"
            },
            {
                "libelle":"Pistolet d'artisant renommé",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("pistolet"),
                "categorie":{
                    "code":"pistolet",
                    "libelle" : "Armes à feu"
                },
                "prix":1200,
                "degats":"1D+5/1D+7",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Impossible de parer avec"
            },
            {
                "libelle":"Pistolet Durandil",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("pistolet"),
                "categorie":{
                    "code":"pistolet",
                    "libelle" : "Armes à feu"
                },
                "prix":1500,
                "degats":"1D+5/1D+7",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":"Impossible de parer avec"
            },
            {
                "libelle":"Pistolet à bayonette",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("pistolet"),
                "categorie":{
                    "code":"pistolet",
                    "libelle" : "Armes à feu"
                },
                "prix":2000,
                "degats":"1D+5/1D+7",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"-3",
                "parade":"-3",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Pistolet perforant",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("pistolet"),
                "categorie":{
                    "code":"pistolet",
                    "libelle" : "Armes à feu"
                },
                "prix":2500,
                "degats":"1D+6/1D+8",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":"1/4 chance d'ignorer PR"
            },
            //#endregion Armes à feu  
            //#region Baton   
            {
                "libelle":"Canne de Bois Mort",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("baton"),
                "categorie":{
                    "code":"baton",
                    "libelle" : "Bâtons"
                },
                "prix":100,
                "degats":"1D+1",
                "courage":"",
                "intelligence":"1",
                "charisme":"-1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-3",
                "parade":"-1",
                "rupture":"1-5",
                "informations":""
                
            },
            {
                "libelle":"Bâton du Bois Mouillé",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("baton"),
                "categorie":{
                    "code":"baton",
                    "libelle" : "Bâtons"
                },
                "prix":200,
                "degats":"1D+1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-3",
                "parade":"-1",
                "rupture":"1-4",
                "informations":"+1 dégat sorts"
            },
            {
                "libelle":"Bâton de Saule",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("baton"),
                "categorie":{
                    "code":"baton",
                    "libelle" : "Bâtons"
                },
                "prix":500,
                "degats":"1D+2",
                "courage":"",
                "intelligence":"1",
                "charisme":"",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-3",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Bâton d'Elémentaliste",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("baton"),
                "categorie":{
                    "code":"baton",
                    "libelle" : "Bâtons"
                },
                "prix":1000,
                "degats":"1D*",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-3",
                "parade":"",
                "rupture":"1-3",
                "informations":"+1 aux sorts d'un élément"
            },
            {
                "libelle":"Bâton Arcanique",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("baton"),
                "categorie":{
                    "code":"baton",
                    "libelle" : "Bâtons"
                },
                "prix":1500,
                "degats":"1D+2",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"",
                "rupture":"1-3",
                "informations":"+1 dégat sorts"
            },
            {
                "libelle":"Le Bâton de l’Éclipse",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("baton"),
                "categorie":{
                    "code":"baton",
                    "libelle" : "Bâtons"
                },
                "prix":2500,
                "degats":"1D+3*",
                "courage":"",
                "intelligence":"1",
                "charisme":"2",
                "adresse":"-1",
                "force":"",
                "chance":"1",
                "attaque":"-2",
                "parade":"",
                "rupture":"1-2",
                "informations":"critique 1-2 / échec 19-20"
            },
            {
                "libelle":"Le Brise-Monde",
                "basePourcentage":40,
                "region":"commun",
                "origine":this.getOrigine("baton"),
                "categorie":{
                    "code":"baton",
                    "libelle" : "Bâtons"
                },
                "prix":4500,
                "degats":"1D+3",
                "courage":"1",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1",
                "informations":"Peut faire son spell en attaquant avec le marteau"
            },
            //#endregion Baton
             //#region Grimoire   
             {
                "libelle":"Grimoire élémentaire basique (feu)",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":350,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-6",
                "informations":"-1EA cout sorts de l'élément"
            },
            {
               "libelle":"Grimoire élémentaire basique (eau)",
               "basePourcentage":95,
               "region":"commun",
               "origine":this.getOrigine("grimoire"),
               "categorie":{
                   "code":"grimoire",
                   "libelle" : "Grimoires"
               },
               "prix":350,
               "degats":"",
               "courage":"",
               "intelligence":"1",
               "charisme":"",
               "adresse":"-1",
               "force":"",
               "chance":"",
               "attaque":"",
               "parade":"-5",
               "rupture":"1-6",
               "informations":"-1EA cout sorts de l'élément"
           },
           {
              "libelle":"Grimoire élémentaire basique (terre)",
              "basePourcentage":95,
              "region":"commun",
              "origine":this.getOrigine("grimoire"),
              "categorie":{
                  "code":"grimoire",
                  "libelle" : "Grimoires"
              },
              "prix":350,
              "degats":"",
              "courage":"",
              "intelligence":"1",
              "charisme":"",
              "adresse":"-1",
              "force":"",
              "chance":"",
              "attaque":"",
              "parade":"-5",
              "rupture":"1-6",
              "informations":"-1EA cout sorts de l'élément"
          },
          {
             "libelle":"Grimoire élémentaire basique (air)",
             "basePourcentage":95,
             "region":"commun",
             "origine":this.getOrigine("grimoire"),
             "categorie":{
                 "code":"grimoire",
                 "libelle" : "Grimoires"
             },
             "prix":350,
             "degats":"",
             "courage":"",
             "intelligence":"1",
             "charisme":"",
             "adresse":"-1",
             "force":"",
             "chance":"",
             "attaque":"",
             "parade":"-5",
             "rupture":"1-6",
             "informations":"-1EA cout sorts de l'élément"
         },
            {
                "libelle":"Grimoire élémentaire avancé (feu)",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":700,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-5",
                "informations":"-1EA cout sorts de l'élément"
            },
            {
                "libelle":"Grimoire élémentaire avancé (eau)",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":700,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-5",
                "informations":"-1EA cout sorts de l'élément"
            },
            {
                "libelle":"Grimoire élémentaire avancé (terre)",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":700,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-5",
                "informations":"-1EA cout sorts de l'élément"
            },
            {
                "libelle":"Grimoire élémentaire avancé (air)",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":700,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-5",
                "informations":"-1EA cout sorts de l'élément"
            },
            {
                "libelle":"Grimoire élémentaire expert (feu)",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":1100,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-4",
                "informations":"-1EA cout sorts de l'élément et -1 durée cast"
            },
            {
                "libelle":"Grimoire élémentaire expert (eau)",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":1100,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-4",
                "informations":"-1EA cout sorts de l'élément et -1 durée cast"
            },
            {
                "libelle":"Grimoire élémentaire expert (terre)",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":1100,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-4",
                "informations":"-1EA cout sorts de l'élément et -1 durée cast"
            },
            {
                "libelle":"Grimoire élémentaire expert (air)",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":1100,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-4",
                "informations":"-1EA cout sorts de l'élément et -1 durée cast"
            },
            {
                "libelle":"Grimoire universel",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":1500,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1-3",
                "informations":"-1EA cout sorts"
            },
            {
                "libelle":"Grimoire des Sables du Temps",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":2000,
                "degats":"",
                "courage":"",
                "intelligence":"2",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"-5",
                "rupture":"1",
                "informations":"-1EA cout sorts et +1 durée des sorts"
            },
            {
                "libelle":"Codex de l'infini",
                "basePourcentage":10,
                "region":"commun",
                "origine":this.getOrigine("grimoire"),
                "categorie":{
                    "code":"grimoire",
                    "libelle" : "Grimoires"
                },
                "prix":5000,
                "degats":"",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"1",
                "attaque":"",
                "parade":"-5",
                "rupture":"*",
                "informations":"1/2 de faire double cast (*1,5mana)"
            },
            //#endregion Grimoire
    
        ];
    }

    static getAllArmure():Array<Armure>{
        return [
            //#region Bouclier
            {
                "libelle":"Bouclier de base",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("bouclier"),
                "categorie":{
                    "code":"bouclier",
                    "libelle" : "Bouclier"
                },
                "prix":100,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"1",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Grand bouclier",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("bouclier"),
                "categorie":{
                    "code":"bouclier",
                    "libelle" : "Bouclier"
                },
                "prix":250,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-2",
                "force":"",
                "chance":"",
                "attaque":"-3",
                "parade":"1",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Bouclier de luxe",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("bouclier"),
                "categorie":{
                    "code":"bouclier",
                    "libelle" : "Bouclier"
                },
                "prix":500,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Grand bouclier de luxe",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("bouclier"),
                "categorie":{
                    "code":"bouclier",
                    "libelle" : "Bouclier"
                },
                "prix":800,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"-2",
                "force":"",
                "chance":"",
                "attaque":"-2",
                "parade":"1",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Bouclier ultra-léger",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("bouclier"),
                "categorie":{
                    "code":"bouclier",
                    "libelle" : "Bouclier"
                },
                "prix":1500,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"2",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Bouclier de champion",
                "basePourcentage":50,
                "region":"commun",
                "origine":this.getOrigine("bouclier"),
                "categorie":{
                    "code":"bouclier",
                    "libelle" : "Bouclier"
                },
                "prix":2500,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"0",
                "parade":"2",
                "rupture":"1-2",
                "informations":""
            },
            //#endregion Bouclier
            //#region Cuir
            {
                "libelle":"Casque ",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir",
                    "libelle" : "Cuir"
                },
                "prix":30,
                "armure":"",
                "courage":"-1",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
                
            },
            {
                "libelle":"Jambières",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir",
                    "libelle" : "Cuir"
                },
                "prix":30,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
            },
            {
                "libelle":"Brassard",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir",
                    "libelle" : "Cuir"
                },
                "prix":30,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
            },
            {
                "libelle":"Plastron",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir",
                    "libelle" : "Cuir"
                },
                "prix":130,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir",
                    "libelle" : "Cuir"
                },
                "prix":30,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
            },
            {
                "libelle":"Ensemble",
                "basePourcentage":200,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir",
                    "libelle" : "Cuir"
                },
                "prix":0,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"1",
                "attaque":"",
                "parade":"",
                "rupture":"",
                "informations":""
            },
            //#endregion Cuir
            //#region Cuir renforcé
            {
                "libelle":"Casque ",
                "basePourcentage":85,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-renforcé",
                    "libelle" : "Cuir Renforcé"
                },
                "prix":75,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Jambière ",
                "basePourcentage":85,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-renforcé",
                    "libelle" : "Cuir Renforcé"
                },
                "prix":75,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Brassard ",
                "basePourcentage":85,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-renforcé",
                    "libelle" : "Cuir Renforcé"
                },
                "prix":75,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":85,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-renforcé",
                    "libelle" : "Cuir Renforcé"
                },
                "prix":200,
                "armure":"2",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Botte ",
                "basePourcentage":85,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-renforcé",
                    "libelle" : "Cuir Renforcé"
                },
                "prix":75,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
                
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":250,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-renforcé",
                    "libelle" : "Cuir Renforcé"
                },
                "prix":0,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":"Rupture : sur 6 pièce au choix"
                
            },
            //#endregion Cuir renforcé
            //region Cuir travaillé
            {
                "libelle":"Casque ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-travaille",
                    "libelle" : "Cuir Travaillé"
                },
                "prix":200,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Jambières ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-travaille",
                    "libelle" : "Cuir Travaillé"
                },
                "prix":200,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Brassard ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-travaille",
                    "libelle" : "Cuir Travaillé"
                },
                "prix":200,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-travaille",
                    "libelle" : "Cuir Travaillé"
                },
                "prix":400,
                "armure":"2",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-travaille",
                    "libelle" : "Cuir Travaillé"
                },
                "prix":200,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1*",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":250,
                "region":"commun",
                "origine":this.getOrigine("armure-cuir"),
                "categorie":{
                    "code":"armure-cuir-travaille",
                    "libelle" : "Cuir Travaillé"
                },
                "prix":0,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"1",
                "parade":"0",
                "rupture":"1-4",
                "informations":"Rupture : sur 6 pièce au choix"
            },
            //#endregion Cuir travaillé
            //#region Maille
            {
                "libelle":"Casque ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille",
                    "libelle" : "Mailles"
                },
                "prix":150,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Hambières ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille",
                    "libelle" : "Mailles"
                },
                "prix":150,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Brassard ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille",
                    "libelle" : "Mailles"
                },
                "prix":150,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille",
                    "libelle" : "Mailles"
                },
                "prix":300,
                "armure":"2",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille",
                    "libelle" : "Mailles"
                },
                "prix":150,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":250,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille",
                    "libelle" : "Mailles"
                },
                "prix":0,
                "armure":"",
                "courage":"1",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"",
                "informations":"+1 contre attaque"
            },
            //#endregion Maille
            //#region Maille renforcée
            {
                "libelle":"Casque ",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-renforcee",
                    "libelle" : "Mailles renforcées"
                },
                "prix":250,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Jambières ",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-renforcee",
                    "libelle" : "Mailles renforcées"
                },
                "prix":250,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Brassard ",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-renforcee",
                    "libelle" : "Mailles renforcées"
                },
                "prix":250,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-renforcee",
                    "libelle" : "Mailles renforcées"
                },
                "prix":500,
                "armure":"3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-renforcee",
                    "libelle" : "Mailles renforcées"
                },
                "prix":250,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":250,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-renforcee",
                    "libelle" : "Mailles renforcées"
                },
                "prix":0,
                "armure":"",
                "courage":"1",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"",
                "informations":"+1 contre attaque"
            },
            //#endregion Maille renforcée
            //#region Maille travaillée
            {
                "libelle":"Casque ",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-travaillees",
                    "libelle" : "Mailles Travaillées"
                },
                "prix":350,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Jambières ",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-travaillees",
                    "libelle" : "Mailles Travaillées"
                },
                "prix":350,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Brassard ",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-travaillees",
                    "libelle" : "Mailles Travaillées"
                },
                "prix":350,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-travaillees",
                    "libelle" : "Mailles Travaillées"
                },
                "prix":700,
                "armure":"3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-travaillees",
                    "libelle" : "Mailles Travaillées"
                },
                "prix":350,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":250,
                "region":"commun",
                "origine":this.getOrigine("armure-maille"),
                "categorie":{
                    "code":"armure-maille-travaillees",
                    "libelle" : "Mailles Travaillées"
                },
                "prix":0,
                "armure":"",
                "courage":"1",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"1",
                "parade":"",
                "rupture":"",
                "informations":"+1 contre attaque"
            },
            //#endregion Maille travaillée
            //#region Plaque
            {
                "libelle":"Casque ",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque",
                    "libelle" : "Plaque"
                },
                "prix":250,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Jambière ",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque",
                    "libelle" : "Plaque"
                },
                "prix":250,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Brassard ",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque",
                    "libelle" : "Plaque"
                },
                "prix":250,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque",
                    "libelle" : "Plaque"
                },
                "prix":500,
                "armure":"3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"-1",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"0",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque",
                    "libelle" : "Plaque"
                },
                "prix":250,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":""
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque",
                    "libelle" : "Plaque"
                },
                "prix":0,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"",
                "informations":"-1 aux critiques réçus"
            },
            //#endregion Plage
            //#region Plaque renforcée
            {
                "libelle":"Casque ",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-renforcee",
                    "libelle" : "Plaque Renforcée"
                },
                "prix":400,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Jambières ",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-renforcee",
                    "libelle" : "Plaque Renforcée"
                },
                "prix":400,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Brasssard ",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-renforcee",
                    "libelle" : "Plaque Renforcée"
                },
                "prix":400,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-renforcee",
                    "libelle" : "Plaque Renforcée"
                },
                "prix":800,
                "armure":"3",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"0",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-renforcee",
                    "libelle" : "Plaque Renforcée"
                },
                "prix":400,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":60,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-renforcee",
                    "libelle" : "Plaque Renforcée"
                },
                "prix":0,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"",
                "informations":"-1 aux critiques réçus"
            },
            //#endregion Plaque renforcée
            //#region Plaque travaillée
            {
                "libelle":"Casque ",
                "basePourcentage":55,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-travaillee",
                    "libelle" : "Plaque Travaillée"
                },
                "prix":600,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1",
                "informations":""
            },
            {
                "libelle":"Jambières ",
                "basePourcentage":55,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-travaillee",
                    "libelle" : "Plaque Travaillée"
                },
                "prix":600,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1",
                "informations":""
            },
            {
                "libelle":"Brassard ",
                "basePourcentage":55,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-travaillee",
                    "libelle" : "Plaque Travaillée"
                },
                "prix":600,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1",
                "informations":""
            },
            {
                "libelle":"Plastron ",
                "basePourcentage":55,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-travaillee",
                    "libelle" : "Plaque Travaillée"
                },
                "prix":1200,
                "armure":"4",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"-1",
                "parade":"0",
                "rupture":"1",
                "informations":""
            },
            {
                "libelle":"Botte ",
                "basePourcentage":55,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-travaillee",
                    "libelle" : "Plaque Travaillée"
                },
                "prix":600,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1",
                "informations":""
            },
            {
                "libelle":"Ensemble ",
                "basePourcentage":55,
                "region":"commun",
                "origine":this.getOrigine("armure-plaque"),
                "categorie":{
                    "code":"armure-plaque-travaillee",
                    "libelle" : "Plaque Travaillée"
                },
                "prix":0,
                "armure":"1",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"1",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"",
                "informations":"-1 aux critiques réçus / -1 rupture PR"
            },
            //#endregion Plaque travaillée
            //#region Robe
            {
                "libelle":"Robe trouée ",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":30,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-6",
                "informations":""
            },
            {
                "libelle":"Robe d'apprenti  ",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":100,
                "armure":"1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
            },
            {
                "libelle":"Robe de l'enchanteur",
                "basePourcentage":85,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":300,
                "armure":"1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"1",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":""
            },
            {
                "libelle":"Robe d'archimage",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":500,
                "armure":"1 / 1*",
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
                "libelle":"Robe du Seigneur des Arcanes (feu)",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":1000,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Pour l'élément : +1 au jet de réussite / +1 resistance "
            },
            {
                "libelle":"Robe du Seigneur des Arcanes (eau)",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":1000,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Pour l'élément : +1 au jet de réussite / +1 resistance "
            },
            {
                "libelle":"Robe du Seigneur des Arcanes (terre)",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":1000,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Pour l'élément : +1 au jet de réussite / +1 resistance "
            },
            {
                "libelle":"Robe du Seigneur des Arcanes (air)",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":1000,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Pour l'élément : +1 au jet de réussite / +1 resistance "
            },
            {
                "libelle":"Robe du Crépuscule ",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":2000,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"1",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-2",
                "informations":""
            },
            {
                "libelle":"Robe du Tisseur de Réalités ",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("robe"),
                "categorie":{
                    "code":"robe",
                    "libelle" : "Robes"
                },
                "prix":4000,
                "armure":"2 / 2*",
                "courage":"1",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"2",
                "attaque":"",
                "parade":"",
                "rupture":"*",
                "informations":"+1 aux chances de crit"
            },
            //#endregion Robe
            //#region Chapeau
            {
                "libelle":"Chapeau Fripé de l’Initié",
                "basePourcentage":95,
                "region":"commun",
                "origine":this.getOrigine("chapeau"),
                "categorie":{
                    "code":"chapeau",
                    "libelle" : "Chapeau"
                },
                "prix":15,
                "armure":"",
                "courage":"",
                "intelligence":"",
                "charisme":"-1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-6",
                "informations":""
            },
            
            {
                "libelle":"Chapeau d'apprenti",
                "basePourcentage":90,
                "region":"commun",
                "origine":this.getOrigine("chapeau"),
                "categorie":{
                    "code":"chapeau",
                    "libelle" : "Chapeau"
                },
                "prix":75,
                "armure":"1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":""
            },
            {
                "libelle":"Chapeau de l’Invocateur",
                "basePourcentage":85,
                "region":"commun",
                "origine":this.getOrigine("chapeau"),
                "categorie":{
                    "code":"chapeau",
                    "libelle" : "Chapeau"
                },
                "prix":200,
                "armure":"1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-5",
                "informations":"+1 aux jets de sorts d'invocation"
            },
            {
                "libelle":"Chapeau du Magicien Crépusculaire",
                "basePourcentage":80,
                "region":"commun",
                "origine":this.getOrigine("chapeau"),
                "categorie":{
                    "code":"chapeau",
                    "libelle" : "Chapeau"
                },
                "prix":400,
                "armure":"1*",
                "courage":"",
                "intelligence":"",
                "charisme":"",
                "adresse":"",
                "force":"",
                "chance":"1",
                "attaque":"",
                "parade":"",
                "rupture":"1-4",
                "informations":"+1EA en dormant"
            },
            {
                "libelle":"Chapeau des Sphères Célestes",
                "basePourcentage":75,
                "region":"commun",
                "origine":this.getOrigine("chapeau"),
                "categorie":{
                    "code":"chapeau",
                    "libelle" : "Chapeau"
                },
                "prix":800,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1-3",
                "informations":"Recup 1/3 mana consommé après combat"
            },
            {
                "libelle":"Chapeau de l’Astral Infini",
                "basePourcentage":70,
                "region":"commun",
                "origine":this.getOrigine("chapeau"),
                "categorie":{
                    "code":"chapeau",
                    "libelle" : "Chapeau"
                },
                "prix":2000,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"1",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"",
                "attaque":"",
                "parade":"",
                "rupture":"1",
                "informations":"+1 récupération PA"
            },
            {
                "libelle":"Chapeau du Maître des Dimensions",
                "basePourcentage":65,
                "region":"commun",
                "origine":this.getOrigine("chapeau"),
                "categorie":{
                    "code":"chapeau",
                    "libelle" : "Chapeau"
                },
                "prix":4000,
                "armure":"1 / 1*",
                "courage":"",
                "intelligence":"2",
                "charisme":"1",
                "adresse":"",
                "force":"",
                "chance":"2",
                "attaque":"",
                "parade":"",
                "rupture":"0",
                "informations":"Téléportation"
            },
            //#endregion Chapeau
        ];
    }
}