type Role = {
    id: number;
}

export type NewUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
};
