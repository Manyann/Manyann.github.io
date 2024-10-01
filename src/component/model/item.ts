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
        },
        "hache" : {
            0:"elfe",
        },
        "masse" : {
            0:"elfe",
        },
        "epee-deux" : {
            0:"elfe",
        },
        "hache-deux" : {
            0:"elfe",
        },
        "marteau" : {
            0:"elfe",
        },
        "lance" : {
            0:"elfe",
        },
        "arc" : {
            0:"elfe",
        },
        "arbalete" : {
            0:"elfe",
        },
        "javelot" : {
            0:"elfe",
        },
        "pistolet" : {
            0:"elfe",
        },
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
    
    static getAll():Array<Item>{
        return [
            //#region  Dagues
            {
                "libelle":"Dague pérave",
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":70,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":70,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
            //endregion Haches 1 main
            //region Masses
            {
                "libelle":"Masse pérave",
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "libelle":"Hache de bonne qualité",
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":70,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":70,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":99,
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
                "basePourcentage":90,
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
                "basePourcentage":85,
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
                "basePourcentage":80,
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
                "basePourcentage":75,
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
        ];
    }
}