import ExpAerospatiales from "./axes/ExpAerospatiales";
import VidParDrone from "./challenges/VidParDrone"

export const GetScene = (name: string) => {
    switch(name)
    {
        case 'Vidéographie par drone':  
            return VidParDrone;
        case 'Expositions Aérospatiales':
            return ExpAerospatiales;
        default:
            return undefined;
    }
}