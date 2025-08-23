import { ThreeDContext, ThreeDContextType } from "@/contexts/ThreeDContext";
import { useContext } from "react";

const useThreeD = (): ThreeDContextType => {
    const context = useContext(ThreeDContext);

    if (context === undefined) {
        throw new Error('useThreeD must be used within a ThreeDProvider');
    }
    
    return context;
};

export default useThreeD;