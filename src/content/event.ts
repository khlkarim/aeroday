export interface Event {
    logo: string;
    name: string;
    subtitle: string;
    edition: string;
    date: {
        day: number;
        month: number;
        year: number;
    };
    location: {
        name: string;
        city: string;
    };
    description: {
        primary: string;
        secondary: string;
    };
    teaser: {
        video: string;
        description: {
            primary: string;
            secondary: string;
        };
    };
    badges: {   
        icon: string;     
        title: string;
        subtitle: string;
    }[];
    sponsors: {
        name: string;
        logo: string;
        website?: string;
    }[];
    editionsPrecedentes: {
        description: string;
    };
    contact: {
        phone: string;
        email: string;
        address: string;
    };
}

export const event: Event = {
    logo: "./assets/images/logos/event.png",
    name: "Tunisian Aeroday",
    subtitle: "Le 2 février 2025 à l'INSAT",
    edition: "13ème édition de l'Aeroday",
    date: {
        day: 2,
        month: 2,
        year: 2026
    },
    location: {
        name: "INSAT",
        city: "Tunis"
    },
    description: {
        primary: "Tunisian Aeroday est l'unique journée nationale entièrement consacrée " +
            "à l'aéronautique en Tunisie. L'événement, fondé par le club Aerobotix de " +
            "l'INSAT, est organisé en collaboration avec l'Association des Techniques " +
            "de Robotique (ATR).",
        secondary: "Cette journée repose sur plusieurs axes et différents défis. Elle vise à " +
            "la vulgarisation du domaine aéronautique auprès du grand public ainsi qu'à " +
            "la découverte des nouveaux potentiels dont disposent les jeunes."
    },
    teaser: {
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: {
            primary: "Cette 12ème édition du Tunisian Aeroday, placée sous le thème inspirant " +
                "de Cieux éternels de l'Afrique, incarne une ambition forte : celle de " +
                "positionner la Tunisie comme un centre névralgique de l'aviation en Afrique. " +
                "Le choix de ce thème reflète une vision d'avenir qui relie l'héritage riche " +
                "et intemporel du continent africain à son potentiel important de développement " +
                "dans le domaine de l'aéronautique. Il s'agit d'un appel à exploiter les vastes " +
                "horizons de l'innovation, à favoriser les échanges et à explorer les opportunités " +
                "stratégiques qu'offre l'aviation, un secteur en pleine expansion en Afrique. " +
                "Ce grand rassemblement vise à sensibiliser le public à l'importance croissante " +
                "de l'industrie aéronautique en Afrique et à son rôle clé dans le développement " +
                "économique et technologique de la région.",
            secondary: "Au-delà des conférences et des ateliers, le Tunisian Aeroday propose des compétitions et des challenges " +
                "scientifiques interactifs qui permettent au public de tous âges de découvrir et d'expérimenter les " +
                "technologies de ce secteur. Ces initiatives visent à stimuler l'esprit d'entreprise et d'innovation, " +
                "en renforçant la conscience collective de l'importance de l'aviation dans la construction de l'avenir " +
                "de l'Afrique. En participant à cet événement, vous contribuez non seulement à la promotion de l'aviation, " +
                "mais aussi à l'émergence d'une nouvelle génération d'innovateurs africains capables de relever les défis " +
                "technologiques de demain."
        }
    },
    editionsPrecedentes: {
        description: "Nos éditions précédentes ont marqué l'histoire de l'aéronautique en Tunisie. " +
            "Chacune a été un succès grâce à l'engagement de nos partenaires, participants et du public. " +
            "Fiers de cet héritage, nous innovons sans cesse pour dépasser les attentes à chaque édition. " +
            "Revivez nos événements passés et découvrez les moments forts qui ont façonné notre histoire aéronautique nationale."
    },
    badges: [
        {
            icon: "trophy",
            title: "Défi a battre",
            subtitle: "Plusieurs challenges vous attendent"
        },
        {
            icon: "history",
            title: "Notre Histoire",
            subtitle: "plus de 10 ans d'experience"
        },
        {
            icon: "gift",
            title: "Des prix a gagner",
            subtitle: "Grands prix à venir."
        },
        {
            icon: "support",
            title: "24 / 7 Support",
            subtitle: "contact@aeroday.tn"
        },
    ],
    sponsors: [
        {
            name: "Company A",
            logo: "https://picsum.photos/100",
            website: "https://company-a.com"
        },
        {
            name: "Company B", 
            logo: "https://picsum.photos/100",
            website: "https://company-b.com"
        },
        {
            name: "Company C",
            logo: "https://picsum.photos/100",
            website: "https://company-c.com"
        },
        {
            name: "Company D", 
            logo: "https://picsum.photos/100",
            website: "https://company-d.com"
        },
        {
            name: "Company E",
            logo: "https://picsum.photos/100",
            website: "https://company-e.com"
        },
        {
            name: "Company F", 
            logo: "https://picsum.photos/100",
            website: "https://company-f.com"
        }
    ],
    contact: {
        phone: "+216 94 384 001",
        email: "contact@aeroday.tn",
        address: "INSAT Centre Urbain Nord\nBP 676 - 1080 Tunis Cedex",
    }
};