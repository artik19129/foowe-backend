import { createPool, Pool } from 'mysql2/promise';

export async function connect(): Promise<Pool> {
    return createPool({
        host: 'localhost',
        user: 'root',
        database: 'foowe_backend',
        connectionLimit: 10
    });
}
