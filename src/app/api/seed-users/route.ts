// src/app/api/seed-users/route.ts

import { NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // Create the 'users' table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      );
    `);

    // Clear existing users to prevent duplicates
    await connection.query('DELETE FROM users');

    // Insert the new dummy users with a plain-text password
    await connection.execute(
      `
      INSERT INTO users (email, password, role)
      VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?);
      `,
      [
        'cast@thedraftfilm.com', 'password123', 'cast',
        'crew@thedraftfilm.com', 'password123', 'crew',
        'admin@thedraftfilm.com', 'password123', 'admin'
      ]
    );

    connection.release();

    return NextResponse.json({
      message: 'Dummy users created successfully!',
    });
  } catch (error) {
    console.error('Failed to seed users:', error);
    return NextResponse.json({ message: 'Failed to create dummy users.' }, { status: 500 });
  }
}