// src/app/api/auth/login/route.ts

import { NextResponse, NextRequest } from 'next/server';
import pool from '@/lib/mysql'; // Corrected import path
import { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const connection = await pool.getConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT password, role FROM users WHERE email = ?',
      [email]
    );

    connection.release();
    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Login successful!', role: user.role },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login.' },
      { status: 500 }
    );
  }
}