export interface LoginUser {
    userName: string;
    password: string;
}

export interface User {
    name: string;
    email: string;
    role: Role;
}

export type Role = "admin" | "normal";