import type { Passenger, PassengerPreview } from "../types";

export type PassengerActions =
    { type: 'store-passenger', payload: { passenger: PassengerPreview } }

export type PassengerState = {
    passengers: Passenger[],
    passengerPreview: PassengerPreview
}

export const initialPassengerPreview = {
    name: '',
    last_name: ''
};

export const initialState: PassengerState = {
    passengers: [],
    passengerPreview: initialPassengerPreview
}

export const passengerReducer = (
    state: PassengerState = initialState,
    action: PassengerActions
) => {
    if (action.type === 'store-passenger') {
        return {
            ...state,
            // passengers: [...state.passengers, action.payload.passenger],
            passengerPreview: initialPassengerPreview
        };
    }
    return state;
}