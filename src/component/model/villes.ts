export class Ville{
    "libelle":string;
    "region":string;
    "type":string;
    "handicap":number;
    "malus" : Array<Malus>;
};

export class Malus{
    "region":string;
    "handicap":number;
}

export class VilleHelper{
    
    static getAll():Array<Ville>{
 return [
    {
        "libelle":"Capitale",
        "region":"commun",
        "type":"capitale",
        "handicap":0,
        "malus" : [
        ]
    },
    {
        "libelle":"Commun - Grande ville",
        "region":"commun",
        "type":"ville-grande",
        "handicap":8,
        "malus" : [
        ]
    },
    {
        "libelle":"Est - Grande ville",
        "region":"est",
        "type":"ville-grande",
        "handicap":8,
        "malus" : [
        ]
    },
    {
        "libelle":"Désert - Grande ville",
        "region":"desert",
        "type":"ville-grande",
        "handicap":10,
        "malus" : [
        ]
    },
    {
        "libelle":"Iles - Grande port",
        "region":"ile",
        "type":"ville-grande",
        "handicap":10,
        "malus" : [
        ]
    },
    {
        "libelle":"Sud - Grande ville",
        "region":"sud",
        "type":"ville-grande",
        "handicap":10,
        "malus" : [
        ]
    },
    {
        "libelle":"Nord - Grande ville",
        "region":"nord",
        "type":"ville-grande",
        "handicap":10,
        "malus" : [
        ]
    },
    {
        "libelle":"Commun - Moyenne ville",
        "region":"commun",
        "type":"ville-moyenne",
        "handicap":15,
        "malus" : [
        ]
    },
    {
        "libelle":"Est - Moyenne ville",
        "region":"est",
        "type":"ville-moyenne",
        "handicap":15,
        "malus" : [
        ]
    },
    {
        "libelle":"Désert - Moyenne ville",
        "region":"desert",
        "type":"ville-moyenne",
        "handicap":18,
        "malus" : [
        ]
    },
    {
        "libelle":"Iles - Moyenne port",
        "region":"ile",
        "type":"ville-moyenne",
        "handicap":18,
        "malus" : [
        ]
    },
    {
        "libelle":"Sud - Moyenne ville",
        "region":"sud",
        "type":"ville-moyenne",
        "handicap":18,
        "malus" : [
        ]
    },
    {
        "libelle":"Nord - Moyenne ville",
        "region":"nord",
        "type":"ville-moyenne",
        "handicap":18,
        "malus" : [
        ]
    },
    {
        "libelle":"Commun - Petite ville",
        "region":"commun",
        "type":"ville-petite",
        "handicap":22,
        "malus" : [
        ]
    },
    {
        "libelle":"Est - Petite ville",
        "region":"est",
        "type":"ville-petite",
        "handicap":22,
        "malus" : [
        ]
    },
    {
        "libelle":"Désert - Petite ville",
        "region":"desert",
        "type":"ville-petite",
        "handicap":23,
        "malus" : [
        ]
    },
    {
        "libelle":"Iles - Petite port",
        "region":"ile",
        "type":"ville-petite",
        "handicap":23,
        "malus" : [
        ]
    },
    {
        "libelle":"Sud - Petite ville",
        "region":"sud",
        "type":"ville-petite",
        "handicap":23,
        "malus" : [
        ]
    },
    {
        "libelle":"Nord - Petite ville",
        "region":"nord",
        "type":"ville-petite",
        "handicap":23,
        "malus" : [
        ]
    },
    {
        "libelle":"Commun - Bourgades, villages, hameaux",
        "region":"commun",
        "type":"bourgade",
        "handicap":27,
        "malus" : [
        ]
    },
    {
        "libelle":"Est - Bourgades, villages, hameaux",
        "region":"est",
        "type":"bourgade",
        "handicap":30,
        "malus" : [
        ]
    },
    {
        "libelle":"Désert - Bourgades, villages, hameaux",
        "region":"desert",
        "type":"bourgade",
        "handicap":30,
        "malus" : [
        ]
    },
    {
        "libelle":"Iles - Bourgades, villages, hameaux",
        "region":"ile",
        "type":"bourgade",
        "handicap":30,
        "malus" : [
        ]
    },
    {
        "libelle":"Sud - Bourgades, villages, hameaux",
        "region":"sud",
        "type":"bourgade",
        "handicap":30,
        "malus" : [
        ]
    },
    {
        "libelle":"Nord - Bourgades, villages, hameaux",
        "region":"nord",
        "type":"bourgade",
        "handicap":30,
        "malus" : [
        ]
    },
    {
        "libelle":"Commun - Campement, fort",
        "region":"commun",
        "type":"campement",
        "handicap":8,
        "malus" : [
        ]
    },
    {
        "libelle":"Est - Campement, fort",
        "region":"est",
        "type":"campement",
        "handicap":12,
        "malus" : [
        ]
    },
    {
        "libelle":"Désert - Campement, fort",
        "region":"desert",
        "type":"campement",
        "handicap":12,
        "malus" : [
        ]
    },
    {
        "libelle":"Iles - Campement, fort",
        "region":"ile",
        "type":"campement",
        "handicap":15,
        "malus" : [
        ]
    },
    {
        "libelle":"Sud - Campement, fort",
        "region":"sud",
        "type":"campement",
        "handicap":15,
        "malus" : [
        ]
    },
    {
        "libelle":"Nord - Campement, fort",
        "region":"nord",
        "type":"campement",
        "handicap":15,
        "malus" : [
        ]
    }
];
    }
}