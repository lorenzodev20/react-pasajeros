import type { Passenger } from "../types";

export type PassengerActions =
    { type: 'store-passenger', payload: { passenger: Passenger } }

export type PassengerState = {
    passengers: Passenger[]
}

export const initialState: PassengerState = {
    passengers: []
}

export const passengerReducer = (
    state: PassengerState = initialState,
    action: PassengerActions
) => {
    if (action.type === 'store-passenger') {
        return {
            ...state,
            passengers: [...state.passengers, action.payload.passenger]
        };
    }
    return state;
}