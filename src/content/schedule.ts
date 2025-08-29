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
            { label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { label: "Pause Déjeuner", startTime: "13:00", endTime: "14:45" },
            { label: "Lancement du challenge", startTime: "15:00", endTime: "20:45" },
            { label: "Dîner", startTime: "21:00", endTime: "22:45" },
            { label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "01 Février",
        schedule: [
            { label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "02 Février",
        schedule: [
            { label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "01 Février",
        schedule: [
            { label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "02 Février",
        schedule: [
            { label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
    {
        label: "26 Janvier",
        schedule: [
            { label: "Check in et Homologation", startTime: "08:00", endTime: "09:45" },
            { label: "Aéromodélisme", startTime: "10:00", endTime: "12:45" },
            { label: "Pause Déjeuner", startTime: "13:00", endTime: "14:45" },
            { label: "Lancement du challenge", startTime: "15:00", endTime: "20:45" },
            { label: "Dîner", startTime: "21:00", endTime: "22:45" },
            { label: "Retour au challenge", startTime: "23:00", endTime: "7:45" },
            { label: "Petit Déjeuner", startTime: "8:00", endTime: "8:45" },
            { label: "Présentations des équipes", startTime: "9:00", endTime: "8:45" },
        ],
    },
];
