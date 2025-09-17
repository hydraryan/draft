import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all scripts
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM scripts');
  return NextResponse.json(results);
}

// POST new script
export async function POST(req: NextRequest) {
  const { title, file_url, version, assigned_to, uploaded_by, download_count } = await req.json();
  const result = await query<ResultSetHeader>(
    'INSERT INTO scripts (title,file_url,version,assigned_to,uploaded_by,download_count) VALUES (?,?,?,?,?,?)',
    [title, file_url, version, assigned_to, uploaded_by, download_count]
  );
  return NextResponse.json({ id: result.insertId });
}

// PUT update script
export async function PUT(req: NextRequest) {
  const { script_id, title, file_url, version, assigned_to, uploaded_by, download_count } = await req.json();
  await query<ResultSetHeader>(
    'UPDATE scripts SET title=?, file_url=?, version=?, assigned_to=?, uploaded_by=?, download_count=? WHERE script_id=?',
    [title, file_url, version, assigned_to, uploaded_by, download_count, script_id]
  );
  return NextResponse.json({ success: true });
}

// DELETE script
export async function DELETE(req: NextRequest) {
  const { script_id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM scripts WHERE script_id=?', [script_id]);
  return NextResponse.json({ success: true });
}
