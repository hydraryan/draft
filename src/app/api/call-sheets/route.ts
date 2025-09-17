import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all call sheets
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM call_sheets');
  return NextResponse.json(results);
}

// POST new call sheet
export async function POST(req: NextRequest) {
  const data = await req.json();
  const keys = ['title','date','scene_details','location','props_required','assigned_to','uploaded_by','file_url','status'];
  const values = keys.map(k => data[k] ?? null);

  const result = await query<ResultSetHeader>(
    'INSERT INTO call_sheets (title,date,scene_details,location,props_required,assigned_to,uploaded_by,file_url,status) VALUES (?,?,?,?,?,?,?,?,?)',
    values
  );

  return NextResponse.json({ id: result.insertId });
}

// PUT update call sheet
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const keys = ['title','date','scene_details','location','props_required','assigned_to','uploaded_by','file_url','status'];
  const values = keys.map(k => data[k] ?? null);
  const { call_sheet_id } = data;

  await query<ResultSetHeader>(
    `UPDATE call_sheets SET title=?, date=?, scene_details=?, location=?, props_required=?, assigned_to=?, uploaded_by=?, file_url=?, status=? WHERE call_sheet_id=?`,
    [...values, call_sheet_id]
  );

  return NextResponse.json({ success: true });
}

// DELETE call sheet
export async function DELETE(req: NextRequest) {
  const { call_sheet_id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM call_sheets WHERE call_sheet_id=?', [call_sheet_id]);
  return NextResponse.json({ success: true });
}
