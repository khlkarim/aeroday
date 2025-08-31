import VidParDrone from "./challenges/VidParDrone";
import ExpAerospatiales from "./axes/ExpAerospatiales";

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