import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all cast
export async function GET() {
  const results = await query<RowDataPacket[]>(`
    SELECT u.*, c.character_name, c.role_type, c.special_notes
    FROM users u
    JOIN cast_details c ON u.id = c.cast_id
    WHERE u.role='cast'
  `);
  return NextResponse.json(results);
}

// POST new cast
export async function POST(req: NextRequest) {
  const { name, email, password, contact_number, uid, character_name, role_type, special_notes } = await req.json();

  const user = await query<ResultSetHeader>(
    'INSERT INTO users (name,email,password,role,contact_number,uid) VALUES (?,?,?,?,?,?)',
    [name,email,password,'cast',contact_number,uid]
  );

  await query<ResultSetHeader>(
    'INSERT INTO cast_details (cast_id,character_name,role_type,special_notes) VALUES (?,?,?,?)',
    [user.insertId, character_name, role_type, special_notes]
  );

  return NextResponse.json({ id: user.insertId });
}

// PUT update cast
export async function PUT(req: NextRequest) {
  const { id, name, email, password, contact_number, uid, character_name, role_type, special_notes } = await req.json();

  await query<ResultSetHeader>(
    'UPDATE users SET name=?, email=?, password=?, contact_number=?, uid=? WHERE id=?',
    [name,email,password,contact_number,uid,id]
  );

  await query<ResultSetHeader>(
    'UPDATE cast_details SET character_name=?, role_type=?, special_notes=? WHERE cast_id=?',
    [character_name, role_type, special_notes, id]
  );

  return NextResponse.json({ success: true });
}

// DELETE cast
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  // deletes both user and cascade deletes cast_details
  await query<ResultSetHeader>('DELETE FROM users WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
