import VidParDrone from "./challenges/VidParDrone";
import ExpAerospatiales from "./axes/ExpAerospatiales";
import CAO from "./challenges/CAD";

export const GetScene = (name: string) => {
    switch(name)
    {
        case 'Vidéographie par drone':  
            return VidParDrone;
        case 'Expositions Aérospatiales':
            return ExpAerospatiales;
        case 'Challenge CAO':
            return CAO;
        default:
            return undefined;
    }
}