// src/app/api/test-db/route.ts

import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    // We explicitly tell TypeScript to expect an array of RowDataPacket
    const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 + 1 AS solution;');
    
    // The query result is an array of rows, so we access the first one
    const solution = rows[0].solution;

    return NextResponse.json({
      message: `Successfully connected to MySQL! 1 + 1 = ${solution}`,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: 'Connection to MySQL failed.' },
      { status: 500 }
    );
  }
}