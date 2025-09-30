export interface VideoCandidate {
    title: string;
    url: string;
    description: string;
    author: string;
    thumbnail: string;
}

export const videoParDroneCandidates: VideoCandidate[] = [
    {
        title: "Drone Footage of City Park",
        url: "https://example.com/videos/city-park-drone",
        description: "Aerial views of the city park captured by drone, showcasing greenery and walking trails.",
        author: "John Doe",
        thumbnail: "https://picsum.photos/400/300"
    },
    {
        title: "Mountain Range Exploration",
        url: "https://example.com/videos/mountain-drone",
        description: "Stunning drone shots of a mountain range during sunrise.",
        author: "Jane Smith",
        thumbnail: "https://picsum.photos/400/300"
    },
    {
        title: "Coastal Drone Adventure",
        url: "https://example.com/videos/coastal-drone",
        description: "A drone journey along the coastline, highlighting cliffs and beaches.",
        author: "Alex Brown",
        thumbnail: "https://picsum.photos/400/300"
    }
];