import { useContext } from "react"
import { PassengerContext } from "../context/PassengerContext";

export const usePassenger = () => {
    const context = useContext(PassengerContext);
    if (!context) {
        throw new Error("usePassenger must be used within a PassengerProvider");
    }

    return context;
}