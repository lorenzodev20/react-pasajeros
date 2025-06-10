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

export type Passenger = BaseEntity & {
    name: string;
    last_name: string;
    payment_status: PaymentStatus['id']
};

export type Payment = BaseEntity & {
    amount: number;
    payment_method_id: number;
    passenger_id: Passenger['id'];
};
