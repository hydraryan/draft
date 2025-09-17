import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all uploads
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM uploads');
  return NextResponse.json(results);
}

// POST new upload
export async function POST(req: NextRequest) {
  const { file_name, file_url, uploaded_by, type, status, approved_by } = await req.json();
  const result = await query<ResultSetHeader>(
    'INSERT INTO uploads (file_name,file_url,uploaded_by,type,status,approved_by) VALUES (?,?,?,?,?,?)',
    [file_name, file_url, uploaded_by, type, status, approved_by]
  );
  return NextResponse.json({ id: result.insertId });
}

// PUT update upload
export async function PUT(req: NextRequest) {
  const { upload_id, file_name, file_url, uploaded_by, type, status, approved_by } = await req.json();
  await query<ResultSetHeader>(
    'UPDATE uploads SET file_name=?, file_url=?, uploaded_by=?, type=?, status=?, approved_by=? WHERE upload_id=?',
    [file_name, file_url, uploaded_by, type, status, approved_by, upload_id]
  );
  return NextResponse.json({ success: true });
}

// DELETE upload
export async function DELETE(req: NextRequest) {
  const { upload_id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM uploads WHERE upload_id=?', [upload_id]);
  return NextResponse.json({ success: true });
}
