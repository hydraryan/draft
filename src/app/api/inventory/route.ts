import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all inventory items
export async function GET() {
  const results = await query<RowDataPacket[]>('SELECT * FROM inventory');
  return NextResponse.json(results);
}

// POST new inventory item
export async function POST(req: NextRequest) {
  const { item_name, category, status, assigned_to, notes } = await req.json();
  const result = await query<ResultSetHeader>(
    'INSERT INTO inventory (item_name,category,status,assigned_to,notes) VALUES (?,?,?,?,?)',
    [item_name, category, status, assigned_to, notes]
  );
  return NextResponse.json({ id: result.insertId });
}

// PUT update inventory item
export async function PUT(req: NextRequest) {
  const { item_id, item_name, category, status, assigned_to, notes } = await req.json();
  await query<ResultSetHeader>(
    'UPDATE inventory SET item_name=?, category=?, status=?, assigned_to=?, notes=? WHERE item_id=?',
    [item_name, category, status, assigned_to, notes, item_id]
  );
  return NextResponse.json({ success: true });
}

// DELETE inventory item
export async function DELETE(req: NextRequest) {
  const { item_id } = await req.json();
  await query<ResultSetHeader>('DELETE FROM inventory WHERE item_id=?', [item_id]);
  return NextResponse.json({ success: true });
}
