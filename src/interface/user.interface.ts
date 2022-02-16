import { Rights } from '../enums/rights.enum';

export interface User {
    id?: number;
    login: string;
    password: string;
    email?: string;
    rights: Rights;
    hwid?: string;
    createdAt: Date;
    updatedAt: Date;
}
