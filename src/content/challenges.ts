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
            day: 1,
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
            day: 31,
            month: 1
        },
        description: 
            "L'AéroModélisme est un challenge où les participants doivent concevoir et construire " +
            "leurs propres modèles réduits de planeurs en suivant un cahier des charges précis. Chaque équipe " +
            "fait ensuite voler son planeur, démontrant son talent technique et créatif devant un public de " +
            "passionnés et un jury de professionnels. Ce challenge est une occasion unique de partager sa passion " +
            "pour l'aéromodélisme dans une ambiance conviviale et inspirante.",
        cahierDesCharges: "https://drive.google.com/file/d/1BUBu1HuYXQRVdyVKUtlIMUEyEXm5DfW7/view",
        formulaire: "https://docs.google.com/forms/d/e/1FAIpQLSe7EtXshqgdu9BKOc2xiCRrYenkaC_omhctgUF2KUTh60WCrg/viewform",
        responsableId: 3
    },
    {
        id: 2,
        name: "Airshow",
        href: "/challenges/airshow",
        image: "/assets/images/challenges/airshow/banner.jpg",
        date: {
            day: 31,
            month: 1
        },
        description: 
            "L'AirShow est un challenge dédié aux avions radio-commandés, où les participants doivent concevoir et réaliser " +
            "leur propre PolyClub en suivant un cahier des charges rigoureux. Au cours de ce show aérien compétitif, chaque équipe " +
            "présente un spectacle innovant, mettant en avant leurs compétences en pilotage devant un jury de professionnels et un " +
            "public enthousiaste.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 7
    },
    {
        id: 3,
        name: "AéroEntrepreneur",
        href: "/challenges/aeroentrepreneur",
        image: "/assets/images/challenges/aeroentrepreneur/banner.jpg",
        date: {
            day: 31,
            month: 1
        },
        description:
            "Le Challenge AéroEntrepreneur est une compétition alliant aéronautique et entrepreneuriat, destinée aux jeunes porteurs " + 
            "d’un esprit d’innovation et d’initiative. Durant 24 heures, les équipes devront concevoir et proposer des solutions aux " +
            "problématiques qui leur seront présentées au début du challenge. Tout au long de l’événement, les participants bénéficieront "+ 
            "de l’accompagnement de coaches spécialisés dans les deux domaines, ainsi que de formations ciblées pour enrichir leurs compétences.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 6
    },
    {
        id: 4,
        name: "Challenge CAO",
        href: "/challenges/challenge-cao",
        image: "/assets/images/challenges/cao/banner.jpg",
        date: {
            day: 1,
            month: 2
        },
        description: "Le challenge CAO (Conception Assistée par Ordinateur) est un challenge de 24 heures destiné aux passionnés de design et d’aéronautique. Les participants devront concevoir un modèle 3D innovant et fonctionnel répondant à une problématique dévoilée au début du hackathon, tout en respectant un cahier des charges précis et en utilisant des logiciels de modélisation tels que SolidWorks ou CATIA... À l’issue du challenge, chaque équipe présentera son projet devant un jury qui évaluera les créations selon des critères techniques, esthétiques et fonctionnels.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 5
    },
    {
        id: 5,
        name: "Vidéographie par Drone",
        href: "/challenges/videographie-par-drone",
        image: "/assets/images/challenges/videographie-par-drone/banner.jpg",
        video: "/assets/images/challenges/videographie-par-drone/video.mp4",
        date: {
            day: 1,
            month: 2
        },
        description: 
            "le Challenge de Vidéographie par Drone invite les participants à explorer le ciel comme une toile de création, transformant l’outil aéronautique en instrument narratif et visuel. Cette année, le challenge s’inscrit sous le thème : \"Simuler une performance acrobatique dans un cirque\". Pour l’édition 2026, le challenge propose aux participants de recréer la magie et la maîtrise d’une performance acrobatique dans un cirque, à travers l’objectif de leur drone. Ce challenge permet aux participants de montrer leur créativité, leur maîtrise technique et leur sens artistique en capturant la fluidité, la précision et l’émotion des acrobaties entre les espaces verts et les bâtiments.",
        cahierDesCharges: "#",
        formulaire: "#",
        responsableId: 8
    }
];
