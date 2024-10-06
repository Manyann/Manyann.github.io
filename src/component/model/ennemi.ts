import { CodeLibelle } from "./code-libelle";


export class Ennemi{
    "nom":string;
    "type":string;
};

export class EnnemiType{
    "code":string;
    "libelle":string;
    "zoneCode":string;
};


export class EnnemiHelper{
    
    static  getAllZone():Array<CodeLibelle>
    {
        return [{
            code:"foret",
            libelle:"Forêt"
        },
        {
            code:"foret-dangereuse",
            libelle:"Forêt Dangereuse"
        },
        {
            code:"desert",
            libelle:"Désert"
        },
        {
            code:"grottes",
            libelle:"Grottes"
        },
        {
            code:"humain",
            libelle:"Humains"
        },
        {
            code:"mer",
            libelle:"Milieu aquatique"
        },
        {
            code:"montagne",
            libelle:"Montagne"
        },
        {
            code:"souterrain",
            libelle:"Souterrain"
        },
        {
            code:"terre",
            libelle:"Terres Sauvage"
        },
        {
            code:"terre-dangereux",
            libelle:"Terres Sauvage Dangereuses"
        },
        {
            code:"urbain",
            libelle:"Urbain"
        },
        {
            code:"montagne",
            libelle:"Montagne"
        },
        {
            code:"givre",
            libelle:"Givre"
        },
        {
            code:"jungle",
            libelle:"Jungle"
        }];
    }  

    static getAllEnnemiType() : Array<EnnemiType>
    {
        return [
        {
            code:"coccinelle",
            libelle:"Coccinelle berserk",
            zoneCode:"foret"
        },
        {
            code:"brigant",
            libelle:"1 brigant de base",
            zoneCode:"foret"
        },
        {
            code:"rat-geant",
            libelle:"1 rat géant affamés",
            zoneCode:"foret"
        },
        {
            code:"bouc",
            libelle:"Bouc en colère",
            zoneCode:"terre"
        },
        {
            code:"coyote",
            libelle:"1 coyote affamé",
            zoneCode:"terre"
        },
        {
            code:"troll-geant",
            libelle:"1 Troll géant maladrois",
            zoneCode:"terre"
        },
        ]
    }

    static getAllEnnemiTypeFromZone(zone:string) : Array<EnnemiType>
    {
        return this.getAllEnnemiType().filter(x=>x.zoneCode == zone);
    }

}
