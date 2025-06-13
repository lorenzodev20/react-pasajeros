type Timestamps = {
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
};

type BaseEntity = {
    id: number;
} & Timestamps;

export type PaymentStatus = BaseEntity & {
    status: string;
};

export type PaymentMethod = BaseEntity & {
    method: string;
};

export type PaymentMethodList = Omit<PaymentMethod, 'created_at' | 'updated_at' | 'deleted_at'>

export type Passenger = BaseEntity & {
    name: string;
    last_name: string;
    payment_status: PaymentStatus['id'];
    identity?: string;
    notes?: string;
    created_by_user?: string;
};

export type Payment = BaseEntity & {
    amount: number;
    payment_method_id: number;
    passenger_id: Passenger['id'];
};

export type PassengerPreview = Omit<Passenger, 'id' | 'payment_status' | 'created_at' | 'updated_at' | 'deleted_at'>

export type PassengerForList = Omit<Passenger, 'created_at' | 'updated_at' | 'deleted_at'>

export type AllPassengersResponse =
    | { passengers: PassengerForList[] }
    | { error: any };

export type PaymentPreview = Omit<Payment, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>