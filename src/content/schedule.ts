import { EventInput } from "@fullcalendar/core";

export interface CalendarEvent extends EventInput {
  extendedProps: {
    icon?: string;
    description?: string;
  };
}

export const janvier26: CalendarEvent[] = [
    {
        title: "Check in et Homologation",
        start: "2026-01-26T08:00",
        end: "2026-01-26T09:45",
        extendedProps: { icon: "check-in" },
    },
    {
        title: "Aéromodélisme",
        start: "2026-01-26T10:00",
        end: "2026-01-26T12:45",
        extendedProps: { icon: "plane", description: 'Challenge des Planeurs' },
    },
    {
        title: "Pause Déjeuner",
        start: "2026-01-26T13:00",
        end: "2026-01-26T14:45",
        extendedProps: { icon: "lunch" },
    },
    {
        title: "Lancement du challenge",
        start: "2026-01-26T15:00",
        end: "2026-01-26T20:45",
        extendedProps: { icon: "challenge" },
    },
    {
        title: "Dîner",
        start: "2026-01-26T21:00",
        end: "2026-01-26T22:45",
        extendedProps: { icon: "dinner" },
    },
    {
        title: "Retour au challenge",
        start: "2026-01-26T23:00",
        end: "2026-01-27T07:45", // ✅ overnight, next day
        extendedProps: { icon: "work" },
    },
    {
        title: "Petit Déjeuner",
        start: "2026-01-27T08:00",
        end: "2026-01-27T08:45",
        extendedProps: { icon: "breakfast" },
    },
    {
        title: "Présentations des équipes",
        start: "2026-01-27T09:00",
        end: "2026-01-27T09:45",
        extendedProps: { icon: "presentation" },
    },
];
export const fevrier1: CalendarEvent[] = [
    {
        title: "Check in et Homologation",
        start: "2026-02-01T13:00",
        end: "2026-02-01T13:30",
        extendedProps: { icon: "check-in" },
    },
    {
        title: "Lancement du cahier des charges",
        start: "2026-02-01T13:30",
        end: "2026-02-01T14:00",
        extendedProps: { icon: "plane" },
    },
    {
        title: "Formation solidworks surfacique",
        start: "2026-02-01T14:00",
        end: "2026-02-01T16:45",
        extendedProps: { icon: "work" },
    },
    {
        title: "Airshow",
        start: "2026-02-01T14:00",
        end: "2026-02-01T16:45",
        extendedProps: { icon: "plane" },
    },
    {
        title: "Clôture de la Journée et remise des certificats",
        start: "2026-02-01T17:00",
        extendedProps: { icon: "presentation" },
    },
];
export const fevrier2: CalendarEvent[] = [
    {
        title: "Check in et Homologation",
        start: "2026-02-02T08:00",
        extendedProps: { icon: "check-in" },
    },
    {
        title: "Challenge Aéromodélisme Junior + Expositions aéronautiques et aérospaciales",
        start: "2026-02-02T09:00",
        end: "2026-02-02T12:00",
        extendedProps: { icon: "work" },
    },
    {
        title: "Pause artistique CinéRadio INSAT",
        start: "2026-02-02T12:00",
        end: "2026-02-02T13:15",
        extendedProps: { icon: "music" },
    },
    {
        title: "Cérémonie d'ouverture",
        start: "2026-02-02T13:30",
        end: "2026-02-02T14:00",
        extendedProps: { icon: "presentation" },
    },
    {
        title: "Conférence de Mr Azouz Bachouche",
        start: "2026-02-02T14:00",
        end: "2026-02-02T14:30",
        extendedProps: { icon: "presentation" },
    },
    {
        title: "Conférence de Mr Belgacem Mekki",
        start: "2026-02-02T14:30",
        end: "2026-02-02T15:00",
        extendedProps: { icon: "presentation" },
    },
    {
        title: "Conférence de Mr Anis Guelbi",
        start: "2026-02-02T15:00",
        end: "2026-02-02T15:30",
        extendedProps: { icon: "presentation" },
    },
    {
        title: "Pause artistique Théatro INSAT",
        start: "2026-02-02T15:30",
        end: "2026-02-02T16:30",
        extendedProps: { icon: "threater" },
    },
    {
        title: "Lancement aérochallenge",
        start: "2026-02-02T15:45",
        end: "2026-02-02T16:45",
        extendedProps: { icon: "plane" },
    },
    {
        title: "Cérémonie de clôture et remise des prix",
        start: "2026-02-02T17:00",
        extendedProps: { icon: "presentation" },
    },
];

export const days: CalendarEvent[] = [...janvier26, ...fevrier1, ...fevrier2];