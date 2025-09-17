import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all crew
export async function GET() {
  const results = await query<RowDataPacket[]>(`
    SELECT u.*, c.department, c.designation, c.skills
    FROM users u
    JOIN crew_details c ON u.id = c.crew_id
    WHERE u.role='crew'
  `);
  return NextResponse.json(results);
}

// POST new crew
export async function POST(req: NextRequest) {
  const { name,email,password,contact_number,uid,department,designation,skills } = await req.json();

  const user = await query<ResultSetHeader>(
    'INSERT INTO users (name,email,password,role,contact_number,uid) VALUES (?,?,?,?,?,?)',
    [name,email,password,'crew',contact_number,uid]
  );

  await query<ResultSetHeader>(
    'INSERT INTO crew_details (crew_id,department,designation,skills) VALUES (?,?,?,?)',
    [user.insertId, department, designation, skills]
  );

  return NextResponse.json({ id: user.insertId });
}

// PUT update crew
export async function PUT(req: NextRequest) {
  const { id,name,email,password,contact_number,uid,department,designation,skills } = await req.json();

  await query<ResultSetHeader>(
    'UPDATE users SET name=?, email=?, password=?, contact_number=?, uid=? WHERE id=?',
    [name,email,password,contact_number,uid,id]
  );

  await query<ResultSetHeader>(
    'UPDATE crew_details SET department=?, designation=?, skills=? WHERE crew_id=?',
    [department,designation,skills,id]
  );

  return NextResponse.json({ success: true });
}

// DELETE crew
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM users WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
