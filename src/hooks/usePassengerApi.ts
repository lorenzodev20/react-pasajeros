import { supabase } from "../config/supabase"
import type { AllPassengersResponse, Passenger, PassengerForList, PassengerPreview, Payment, PaymentPreview } from "../types"

export const usePassengerApi = () => {

    const parsePassenger = (passenger: PassengerPreview): Passenger => {
        let date = new Date();
        return {
            id: Math.floor(Math.random() * 50),
            name: passenger.name,
            last_name: passenger.last_name,
            payment_status: 1,
            created_at: date,
            updated_at: date
        }
    }

    const parsePayment = ({ amount, passenger_id, payment_method_id }: PaymentPreview): Payment => {
        let date = new Date();
        return {
            id: Math.floor(Math.random() * 50),
            amount,
            passenger_id,
            payment_method_id,
            created_at: date,
            updated_at: date
        }
    }

    const store = async ({ name, last_name, payment_status, created_at, updated_at, deleted_at }: Passenger) => {
        try {
            const { data, error } = await supabase
                .from('passengers')
                .insert([
                    { name, last_name, payment_status, created_at, updated_at, deleted_at },
                ])
                .select()

            if (error) {
                console.error("Supabase storePassenger error:", error);
                return { error };
            }

            return { data };
        } catch (err) {
            console.error("Unexpected storePassenger error:", err);
            return { error: err };
        }
    }

    const all = async (): Promise<AllPassengersResponse> => {

        try {
            let { data: passengers, error } = await supabase
                .from('passengers')
                .select(`id, name, last_name, payment_status`)
                .order('id', { ascending: false });

            if (error) {
                console.error("Supabase select error:", error);
                return { error };
            }

            return { passengers: passengers as PassengerForList[] };
        } catch (err) {
            console.error("Unexpected all error:", err);
            return { error: err };
        }
    }

    const paymentStore = async ({ amount, passenger_id, payment_method_id, created_at, updated_at }: Payment) => {
        try {
            const { data, error } = await supabase
                .from('payments')
                .insert([{ amount, passenger_id, payment_method_id, created_at, updated_at }])
                .select()
            if (error) {
                console.error("Supabase insert error:", error);
                return { error };
            }

            return { data };
        } catch (err) {
            console.error("Unexpected paymentStore error:", err);
            return { error: err };
        }
    }
    type PassengerResponse = { passenger: Passenger | null, error?: any }

    const getPassenger = async (passengerId: number): Promise<PassengerResponse> => {
        try {
            let { data, error } = await supabase
                .from('passengers')
                .select("*")
                .eq('id', passengerId)

            if (error) {
                console.error("Supabase getPassenger error:", error);
                return { passenger: null, error };
            }
            return { passenger: data?.[0] ?? null };
        } catch (err) {
            console.error("Unexpected getPassenger error:", err);
            return { passenger: null, error: err };
        }
    }

    const updatePassenger = async (passengerId: number, { name, last_name, notes, identity }: Passenger): Promise<PassengerResponse> => {
        try {
            let { data, error } = await supabase
                .from('passengers')
                .update({ name, last_name, notes, identity })
                .eq('id', passengerId)
                .select();

            if (error) {
                console.error("Supabase updatePassenger error:", error);
                return { passenger: null, error };
            }
            return { passenger: data?.[0] ?? null };
        } catch (err) {
            console.error("Unexpected updatePassenger error:", err);
            return { passenger: null, error: err };
        }
    }

    return {
        store,
        parsePassenger,
        all,
        paymentStore,
        parsePayment,
        getPassenger,
        updatePassenger
    }
}