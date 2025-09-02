import CAO from "./challenges/CAD";
import ExpAerospatiales from "./axes/ExpAerospatiales";
import AeroChallenge from "./challenges/AeroChallenge";
import AeroModelisme from "./challenges/AeroModelisme";

export const GetScene = (name: string) => {
    switch(name)
    {
        case 'AéroModélisme':
            return AeroModelisme;
        case 'Expositions Aérospatiales':
            return ExpAerospatiales;
        case 'Challenge CAO':
            return CAO;
        case 'AéroChallenge':
            return AeroChallenge;
        default:
            return undefined;
    }
}