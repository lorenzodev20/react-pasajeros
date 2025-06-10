import { createContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react"
import { initialState, passengerReducer, type PassengerActions, type PassengerState } from "../reducers/passenger-reducer"

type PassengerContextProps = {
    state: PassengerState,
    dispatch: Dispatch<PassengerActions>
};

type PassengerProviderProps = {
    children: ReactNode
};

export const PassengerContext = createContext<PassengerContextProps>({} as PassengerContextProps);

export const PassengerProvider = ({ children }: PassengerProviderProps) => {

    const [state, dispatch] = useReducer(passengerReducer, initialState);

    // Mejoramos el rendimiento de la app al asegurarnos que realmente se pasan cambios nuevos
    const obj = useMemo(() => ({ state, dispatch }), [])

    return (
        <PassengerContext.Provider value={obj}>
            {children}
        </PassengerContext.Provider>
    );
}
