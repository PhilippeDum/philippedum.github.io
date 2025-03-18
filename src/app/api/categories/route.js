// /src/app/api/categories/route.js
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await query('SELECT * FROM categories');
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}