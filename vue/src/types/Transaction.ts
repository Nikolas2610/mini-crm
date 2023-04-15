export interface Transaction {
    id: number;
    amount: number;
    client: {
        id: number;
        firstName: string;
        lastName: string;
    };
    transaction_date: string  
}