export interface UserState {
    id: number | null;
    name: string | null;
    email: string | null;
    admin: boolean;
    token: string | null;
}