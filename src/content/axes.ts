export interface Axe {
    id: number;
    name: string;
    href: string;
    image: string;
    date?: {
        day: number;
        month: number;
    };
    description: string;
    formulaire: string;
    responsableId: number;
}

export const axes: Axe[] = [
    {
        id: 0,
        name: "Expositions Aéronautiques",
        href: "/axes/expositions-aeronautiques",
        image: "/assets/images/axes/expositions-aeronautiques/banner.jpg",
        date: {
            day: 1, 
            month: 2
        },
        description: "Plongez au cœur d’une exposition aéronautique où l’imagination des jeunes s’élève aux côtés du savoir des experts. Dans le hall de l’INSAT, les stands deviennent un ciel d’échanges et d’inspirations, où brillent projets audacieux, innovations et rêves d’altitude. ",
        formulaire: "#",
        responsableId: 22
    },
    {
        id: 1,
        name: "Expositions Aérospatiales",
        href: "/axes/expositions-aerospatiales",
        image: "/assets/images/axes/expositions-aerospatiales/banner.jpg",
        date: {
            day: 1,
            month: 2
        },
        description: 
            "Cet axe vous invite à explorer un domaine captivant qui repousse " +
            "les frontières terrestres et ouvre les portes de l'innovation et de l'avenir. " +
            "Le secteur aérospatial suscite un intérêt grandissant pour les mystères de l'univers. " +
            "Cette exposition offrira aux visiteurs l'occasion de plonger dans une diversité " +
            "de projets fascinants, révélant les promesses de l'espace et éveillant la curiosité " +
            "des passionnés pour l'astronomie et l'exploration spatiale.",
        formulaire: "#",
        responsableId: 9
    },
    {
        id: 2,
        name: "Ateliers Novices",
        href: "/axes/ateliers-novices",
        image: "/assets/images/axes/novices/banner.jpg",        
        description:
            "Les Ateliers Novices sont conçus pour les jeunes débutants en aéronautique, âgés de 6 à 17 ans. Au programme: Défis en aéromodélisme, Aero Entrepreneure Junior et CAO — des activités adaptées à chaque âge pour apprendre, imaginer et s’envoler vers l’innovation!",
        formulaire: "#",
        responsableId: 10
    }, 
    {
        id: 3,
        name: "Ambassadorship",
        href: "/axes/ambassade",
        image: "/assets/images/axes/ambassade/banner.jpg",    
        description: 
            "L'Ambassade est un axe clé de l'Aeroday, visant à donner une dimension " +
            "nationale et internationale à l'événement. En attirant des conférenciers, " +
            "participants, et médias, cet axe assure une organisation inclusive et " +
            "diversifiée. Grâce à son réseau d'ambassadeurs, il connecte l'événement " +
            "avec plusieurs universités et acteurs nationaux, tout en organisant des " +
            "conférences qui encouragent le partage des connaissances en aéronautique.",
        formulaire: "https://docs.google.com/forms/d/e/1FAIpQLSdFfxAFflV2TEx6_cxPtiqIMnMYE4D_m-MmW4EHgLUJNr7QNA/viewform",
        responsableId: 16
    }
];
