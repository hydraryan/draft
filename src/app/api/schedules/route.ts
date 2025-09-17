import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all schedules
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM schedules');
  return NextResponse.json(results);
}

// POST new schedule
export async function POST(req: NextRequest) {
  const { scene_number, date_time, location, cast_ids, crew_ids, status, notes } = await req.json();
  const result = await query<ResultSetHeader>(
    'INSERT INTO schedules (scene_number,date_time,location,cast_ids,crew_ids,status,notes) VALUES (?,?,?,?,?,?,?)',
    [scene_number, date_time, location, cast_ids, crew_ids, status, notes]
  );
  return NextResponse.json({ id: result.insertId });
}

// PUT update schedule
export async function PUT(req: NextRequest) {
  const { schedule_id, scene_number, date_time, location, cast_ids, crew_ids, status, notes } = await req.json();
  await query<ResultSetHeader>(
    'UPDATE schedules SET scene_number=?, date_time=?, location=?, cast_ids=?, crew_ids=?, status=?, notes=? WHERE schedule_id=?',
    [scene_number, date_time, location, cast_ids, crew_ids, status, notes, schedule_id]
  );
  return NextResponse.json({ success: true });
}

// DELETE schedule
export async function DELETE(req: NextRequest) {
  const { schedule_id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM schedules WHERE schedule_id=?', [schedule_id]);
  return NextResponse.json({ success: true });
}
