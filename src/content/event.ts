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
        description: string;
        headlines: string[];
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
        galleries: {
            label: string;
            images: string[];
        }[];
        description: string;
    };
    contact: {
        phone: string;
        email: string;
        address: string;
    };
}

export const event: Event = {
    logo: "/assets/images/deco/title.png",
    name: "Tunisian Aeroday",
    subtitle: "Le 1 Février 2026 à l'INSAT",
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
            "la découverte de nouveaux potentiels dont disposent les jeunes."
    },
    teaser: {
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: 
            "Cette 13ème édition du Tunisian Aeroday, placée sous le thème de AEROPARK, transforme l’univers de l’aéronautique en une véritable expérience immersive et ludique. " +
            "Inspiré des parcs d’attractions, AEROPARK invite les passionnés et les curieux à découvrir l’aéronautique sous un nouveau visage — un lieu où innovation, divertissement et découverte se rencontrent. " + 
            "À travers cette édition, le Tunisian Aeroday ambitionne de rapprocher la science et le rêve, en faisant de l’aviation non seulement un domaine d’expertise, mais aussi un espace d’émerveillement accessible à tous.",
        headlines: [
            "🚀 Un appel à innover, échanger et explorer les opportunités stratégiques de l’aviation",
            "🌍 Un thème qui relie l’héritage africain à son immense potentiel de développement",
            "🎤 Bien plus que des conférences et ateliers ✈️",
        ]
    },
    editionsPrecedentes: {
        galleries: [
            {
                label: 'Aeroday 2017',
                images: [
                    '/assets/images/editions-precedentes/2017/aeroday-2017-0.jpeg',
                    '/assets/images/editions-precedentes/2017/aeroday-2017-1.jpeg',
                    '/assets/images/editions-precedentes/2017/aeroday-2017-2.jpeg',
                    '/assets/images/editions-precedentes/2017/aeroday-2017-3.jpeg',
                    '/assets/images/editions-precedentes/2017/aeroday-2017-4.jpeg',
                ]
            },
            // {
            //     label: 'Aeroday 2018',
            //     images: [
            //         '/assets/images/editions-precedentes/2018/aeroday-2018-0.jpeg',
            //         // '/assets/images/editions-precedentes/2018/aeroday-2018-1.jpeg',
            //         '/assets/images/editions-precedentes/2018/aeroday-2018-2.jpeg',
            //         '/assets/images/editions-precedentes/2018/aeroday-2018-3.jpeg',
            //     ]
            // },
            // {
            //     label: 'Aeroday 2019',
            //     images: [
            //         '/assets/images/editions-precedentes/2019/aeroday-2019-0.jpeg',
            //         '/assets/images/editions-precedentes/2019/aeroday-2019-1.jpeg',
            //         '/assets/images/editions-precedentes/2019/aeroday-2019-2.jpeg',
            //         '/assets/images/editions-precedentes/2019/aeroday-2019-3.jpeg',
            //     ]
            // },
            {
                label: 'Aeroday 2020',
                images: [
                    '/assets/images/editions-precedentes/2020/aeroday-2020-0.jpeg',
                    '/assets/images/editions-precedentes/2020/aeroday-2020-1.jpeg',
                    '/assets/images/editions-precedentes/2020/aeroday-2020-2.jpeg',
                    '/assets/images/editions-precedentes/2020/aeroday-2020-3.jpeg',
                    '/assets/images/editions-precedentes/2020/aeroday-2020-4.jpeg',
                    '/assets/images/editions-precedentes/2020/aeroday-2020-5.jpeg',
                    // '/assets/images/editions-precedentes/2020/aeroday-2020-6.jpeg',
                ]
            },
            {
                label: 'Aeroday 2021',
                images: [
                    '/assets/images/editions-precedentes/2021/aeroday-2021-9.jpg',
                    '/assets/images/editions-precedentes/2021/aeroday-2021-7.jpg',
                    // '/assets/images/editions-precedentes/2021/aeroday-2021-0.jpg',
                    '/assets/images/editions-precedentes/2021/aeroday-2021-1.jpg',
                    // '/assets/images/editions-precedentes/2021/aeroday-2021-2.jpg',
                    '/assets/images/editions-precedentes/2021/aeroday-2021-3.jpg',
                    '/assets/images/editions-precedentes/2021/aeroday-2021-4.jpg',
                    '/assets/images/editions-precedentes/2021/aeroday-2021-8.jpg',
                    // '/assets/images/editions-precedentes/2021/aeroday-2021-5.jpg',
                    '/assets/images/editions-precedentes/2021/aeroday-2021-6.jpg',
                    // '/assets/images/editions-precedentes/2021/aeroday-2021-10.jpg',
                ]
            },
            {
                label: 'Aeroday 2025',
                images: [
                    '/assets/images/editions-precedentes/2025/aeroday-2025-0.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-7.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-11.jpg',
                    // '/assets/images/editions-precedentes/2025/aeroday-2025-1.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-2.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-9.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-3.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-4.jpg',
                    // '/assets/images/editions-precedentes/2025/aeroday-2025-8.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-10.jpg',
                    '/assets/images/editions-precedentes/2025/aeroday-2025-5.jpg',
                    // '/assets/images/editions-precedentes/2025/aeroday-2025-6.jpg',
                ]
            },
        ],
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
        // {
        //     name: "Company A",
        //     logo: "https://picsum.photos/100",
        //     website: "https://company-a.com"
        // },
        // {
        //     name: "Company B", 
        //     logo: "https://picsum.photos/100",
        //     website: "https://company-b.com"
        // },
        // {
        //     name: "Company C",
        //     logo: "https://picsum.photos/100",
        //     website: "https://company-c.com"
        // },
        // {
        //     name: "Company D", 
        //     logo: "https://picsum.photos/100",
        //     website: "https://company-d.com"
        // },
        // {
        //     name: "Company E",
        //     logo: "https://picsum.photos/100",
        //     website: "https://company-e.com"
        // },
        // {
        //     name: "Company F", 
        //     logo: "https://picsum.photos/100",
        //     website: "https://company-f.com"
        // }
    ],
    contact: {
        phone: "+216 94 384 001",
        email: "contact@aeroday.tn",
        address: "INSAT Centre Urbain Nord\nBP 676 - 1080 Tunis Cedex",
    }
};
event.editionsPrecedentes.galleries.reverse();