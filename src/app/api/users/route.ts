import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all users
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM users');
  return NextResponse.json(results);
}

// POST new user
export async function POST(req: NextRequest) {
  const { name, email, password, role, contact_number, uid } = await req.json();
  const result = await query<ResultSetHeader>(
    'INSERT INTO users (name, email, password, role, contact_number, uid) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, password, role, contact_number, uid]
  );
  return NextResponse.json({ id: result.insertId });
}

// PUT update user
export async function PUT(req: NextRequest) {
  const { id, name, email, password, role, contact_number, uid } = await req.json();
  await query<ResultSetHeader>(
    'UPDATE users SET name=?, email=?, password=?, role=?, contact_number=?, uid=? WHERE id=?',
    [name, email, password, role, contact_number, uid, id]
  );
  return NextResponse.json({ success: true });
}

// DELETE user
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM users WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
