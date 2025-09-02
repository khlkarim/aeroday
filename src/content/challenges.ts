export interface Challenge {
    id: number;
    name: string;
    href: string;
    image: string;
    video?: string;
    date: {
        day: number;
        month: number;
    };
    description: string;
    cahierDesCharges: string;
    formulaire: string;
    responsableId: number;
}

export const challenges: Challenge[] = [
    {
        id: 0,
        name: "AéroChallenge",
        href: "/challenges/aerochallenge",
        image: "/assets/images/challenges/aerochallenge/banner.jpg",
        date: {
            day: 2,
            month: 2
        },
        description: 
            "L'AéroChallenge est une compétition ouverte aux étudiants et passionnés, " +
            "qui met les participants au défi de piloter leurs drones sur un circuit prédéfini, " +
            "naviguant avec précision à travers les obstacles de la piste de course, tout en respectant " +
            "les exigences du cahier des charges. Ce challenge a pour objectif de réunir les passionnés " +
            "de drones dans un affrontement captivant où leur talent, leurs compétences et leur enthousiasme " +
            "seront mis en lumière.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 4
    },
    {
        id: 1,
        name: "AéroModélisme",
        href: "/challenges/aeromodelisme",
        image: "/assets/images/challenges/aeromodelisme/banner.jpg",
        date: {
            day: 26,
            month: 1
        },
        description: 
            "L'AéroModélisme est un challenge indoor où les participants doivent concevoir et construire " +
            "leurs propres modèles réduits de planeurs en suivant un cahier des charges précis. Chaque équipe " +
            "fait ensuite voler son planeur, démontrant son talent technique et créatif devant un public de " +
            "passionnés et un jury de professionnels. Ce challenge est une occasion unique de partager sa passion " +
            "pour l'aéromodélisme dans une ambiance conviviale et inspirante.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 3
    },
    {
        id: 2,
        name: "Airshow",
        href: "/challenges/airshow",
        image: "/assets/images/challenges/airshow/banner.jpg",
        date: {
            day: 26,
            month: 1
        },
        description: 
            "L'AirShow est un challenge indoor dédié aux avions radio-commandés, où les participants doivent concevoir et réaliser " +
            "leur propre PolyClub en suivant un cahier des charges rigoureux. Au cours de ce show aérien compétitif, chaque équipe " +
            "présente un spectacle innovant, mettant en avant leurs compétences en pilotage devant un jury de professionnels et un " +
            "public enthousiaste.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 7
    },
    {
        id: 3,
        name: "Challenge CAO",
        href: "/challenges/challenge-cao",
        image: "/assets/images/challenges/cao/banner.jpg",
        date: {
            day: 1,
            month: 2
        },
        description: 
            "La Conception Assistée par Ordinateur est un challenge de 24 heures destinée aux passionnés du design et de l'aéronautique. " +
            "Les participants devront concevoir un modèle 3D novateur et fonctionnel d'un engin, en respectant un cahier des charges précis " +
            "et en utilisant des logiciels de modélisation (SolidWorks, Catia, …). À l'issue du challenge, chaque équipe présentera son projet " +
            "devant un jury d'experts en CAO, qui évaluera les créations selon des critères pertinents.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 5
    },
    {
        id: 4,
        name: "Vidéographie par drone",
        href: "/challenges/videographie-par-drone",
        image: "/assets/images/challenges/videographie-par-drone/banner.jpg",
        video: "/assets/images/challenges/videographie-par-drone/video.mp4",
        date: {
            day: 2,
            month: 2
        },
        description: 
            "Le challenge de vidéographie par drone offre aux passionnés de production visuelle une occasion unique de présenter leurs œuvres au grand public. " +
            "Les participants devront respecter un cahier des charges précis, garantissant une compétition de qualité où créativité et expertise seront mises en avant. " +
            "Cette compétition mettra en lumière le talent des vidéastes et permettra de valoriser la maîtrise technique de la production aérienne.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 8
    }
];