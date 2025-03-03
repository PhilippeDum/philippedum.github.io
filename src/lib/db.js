// /src/lib/db.js
import { Pool } from 'pg';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: {
        rejectUnauthorized: false,  // Important pour Supabase sur Vercel (SSL)
    },
    connectionTimeoutMillis: 10000,
});

export const query = async (text, params) => {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};
