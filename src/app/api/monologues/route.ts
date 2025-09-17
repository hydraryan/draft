import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all monologues
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM monologues');
  return NextResponse.json(results);
}

// POST new monologue
export async function POST(req: NextRequest) {
  const { text_content, assigned_to, given_at, status } = await req.json();
  const result = await query<ResultSetHeader>(
    'INSERT INTO monologues (text_content,assigned_to,given_at,status) VALUES (?,?,?,?)',
    [text_content, assigned_to, given_at, status]
  );
  return NextResponse.json({ id: result.insertId });
}

// PUT update monologue
export async function PUT(req: NextRequest) {
  const { monologue_id, text_content, assigned_to, given_at, status } = await req.json();
  await query<ResultSetHeader>(
    'UPDATE monologues SET text_content=?, assigned_to=?, given_at=?, status=? WHERE monologue_id=?',
    [text_content, assigned_to, given_at, status, monologue_id]
  );
  return NextResponse.json({ success: true });
}

// DELETE monologue
export async function DELETE(req: NextRequest) {
  const { monologue_id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM monologues WHERE monologue_id=?', [monologue_id]);
  return NextResponse.json({ success: true });
}
