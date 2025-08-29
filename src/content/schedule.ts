export interface Period
{
    icon?: string;
    label: string;
    startTime: string;
    endTime?: string;
}

export interface Day
{
    label: string;
    schedule: Period[];
}

export const days: Day[] = [
    {
        label: "26 Janvier",
        schedule: [
            { icon: "check-in", label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { icon: "plane", label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { icon: "lunch", label: "Pause Déjeuner", startTime: "13:00", endTime: "14:45" },
            { icon: "challenge", label: "Lancement du challenge", startTime: "15:00", endTime: "20:45" },
            { icon: "dinner", label: "Dîner", startTime: "21:00", endTime: "22:45" },
            { icon: "work", label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { icon: "breakfast", label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { icon: "presentation", label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "01 Février",
        schedule: [
            { icon: "check-in", label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { icon: "plane", label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { icon: "work", label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { icon: "breakfast", label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { icon: "presentation", label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "02 Février",
        schedule: [
            { icon: "check-in", label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { icon: "work", label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { icon: "breakfast", label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { icon: "presentation", label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "01 Février",
        schedule: [
            { icon: "check-in", label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { icon: "plane", label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { icon: "work", label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { icon: "breakfast", label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { icon: "presentation", label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "02 Février",
        schedule: [
            { icon: "check-in", label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { icon: "work", label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { icon: "breakfast", label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { icon: "presentation", label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "26 Janvier",
        schedule: [
            { icon: "check-in", label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { icon: "plane", label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { icon: "lunch", label: "Pause Déjeuner", startTime: "13:00", endTime: "14:45" },
            { icon: "challenge", label: "Lancement du challenge", startTime: "15:00", endTime: "20:45" },
            { icon: "dinner", label: "Dîner", startTime: "21:00", endTime: "22:45" },
            { icon: "work", label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { icon: "breakfast", label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { icon: "presentation", label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
];
