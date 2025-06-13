import type { Passenger, PassengerPreview } from "../types";

export type PassengerActions =
    { type: 'store-passenger', payload: { passenger: PassengerPreview } }

export type PassengerState = {
    passengers: Passenger[],
    passengerPreview: PassengerPreview,
    passengerDetail:  Passenger,
}

export const initialPassengerPreview = {
    name: '',
    last_name: ''
};

export const initialPassenger: Passenger = {
    id: 0,
    name: '',
    last_name: '',
    identity: '',
    payment_status: 1,
    notes:'',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
};

export const initialState: PassengerState = {
    passengers: [],
    passengerPreview: initialPassengerPreview,
    passengerDetail: initialPassenger
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