import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all attendance records
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM attendance');
  return NextResponse.json(results);
}

// POST new attendance record
export async function POST(req: NextRequest) {
  const { user_id, date, status, notes } = await req.json();
  const result = await query<ResultSetHeader>(
    'INSERT INTO attendance (user_id,date,status,notes) VALUES (?,?,?,?)',
    [user_id, date, status, notes]
  );
  return NextResponse.json({ id: result.insertId });
}

// PUT update attendance record
export async function PUT(req: NextRequest) {
  const { attendance_id, user_id, date, status, notes } = await req.json();
  await query<ResultSetHeader>(
    'UPDATE attendance SET user_id=?, date=?, status=?, notes=? WHERE attendance_id=?',
    [user_id, date, status, notes, attendance_id]
  );
  return NextResponse.json({ success: true });
}

// DELETE attendance record
export async function DELETE(req: NextRequest) {
  const { attendance_id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM attendance WHERE attendance_id=?', [attendance_id]);
  return NextResponse.json({ success: true });
}
