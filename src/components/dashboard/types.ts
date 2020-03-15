export interface Member {
    person_id: string,
    role: string,
    access_level: string,
}

export enum Roles {
    CUSTOMER = 'customer',
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
}

export enum AccessLevel {
    READ = 'read',
    WRITE = 'write',
    ADMIN = 'admin',
}

export interface Person {
    person_id: string,
    firstname: string,
    lastname: string,
    title: string,
    business_unit: string,
    is_user: boolean
}

export interface Option {
    value: string,
    displayValue: string,
}
