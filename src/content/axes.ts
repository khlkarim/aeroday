export interface Axe {
    id: number;
    name: string;
    href: string;
    image: string;
    date: {
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
            day: 2, 
            month: 2
        },
        description: 
            "Plongez dans une exposition aéronautique captivante où " +
            "la créativité et la passion des jeunes passionnés rencontrent " +
            "l'expertise des professionnels chevronnés. Les stands, installés " +
            "dans le hall de l'INSAT, offrent un espace d'échange inspirant " +
            "et intergénérationnel, mettant en lumière des projets, des " +
            "innovations et des exploits remarquables.",
        formulaire: "#",
        responsableId: 8
    },
    {
        id: 1,
        name: "Expositions Aérospatiales",
        href: "/axes/expositions-aerospatiales",
        image: "/assets/images/axes/expositions-aerospatiales/banner.jpg",
        date: {
            day: 2,
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
        responsableId: 8
    },
    {
        id: 2,
        name: "Ateliers Novices",
        href: "/axes/ateliers-novices",
        image: "/assets/images/axes/novices/banner.jpg",        
        date: {
            day: 2, 
            month: 2
        },
        description: 
            "Avec une confiance profonde dans le potentiel des générations futures, " +
            "nous avons créé les Ateliers Novices, une expérience immersive pour " +
            "les enfants de 4 à 17 ans, visant à les initier au monde de l'aéronautique. " +
            "Ce mini Aeroday propose des ateliers adaptés à chaque tranche d'âge, " +
            "incluant des défis en aéromodélisme, programmation et conception assistée " +
            "par ordinateur (CAO), pour des découvertes enrichissantes.",
        formulaire: "#",
        responsableId: 10
    }, 
    {
        id: 3,
        name: "Ambassade",
        href: "/axes/ambassade",
        image: "/assets/images/axes/ambassade/banner.jpg",    
        date: {
            day: 2, 
            month: 2
        },
        description: 
            "L'Ambassade est un axe clé de l'Aeroday, visant à donner une dimension " +
            "nationale et internationale à l'événement. En attirant des conférenciers, " +
            "participants, et médias, cet axe assure une organisation inclusive et " +
            "diversifiée. Grâce à son réseau d'ambassadeurs, il connecte l'événement " +
            "avec plusieurs universités et acteurs nationaux, tout en organisant des " +
            "conférences qui encouragent le partage des connaissances en aéronautique.",
        formulaire: "#",
        responsableId: 9
    }
];