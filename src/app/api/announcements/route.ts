import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/[...nextauth]/route";

// GET all announcements
export async function GET() {
  const [results] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM announcements"
  );
  return NextResponse.json(results);
}

// POST new announcement (uses logged-in user automatically)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { title, message, target_group, target_type, target_value, priority } =
      await req.json();

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO announcements (title, message, posted_by, target_group, target_type, target_value, priority) VALUES (?,?,?,?,?,?,?)",
      [
        title,
        message,
        session.user.id, // ✅ Automatically set to logged-in user
        target_group,
        target_type,
        target_value || null,
        priority,
      ]
    );

    return NextResponse.json({ id: (result as any).insertId });
  } catch (error: any) {
    console.error("Error in POST /announcements:", error);
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}

// PUT update announcement
export async function PUT(req: NextRequest) {
  const {
    announcement_id,
    title,
    message,
    target_group,
    target_type,
    target_value,
    priority,
  } = await req.json();

  await pool.query<ResultSetHeader>(
    "UPDATE announcements SET title=?, message=?, target_group=?, target_type=?, target_value=?, priority=? WHERE announcement_id=?",
    [title, message, target_group, target_type, target_value || null, priority, announcement_id]
  );

  return NextResponse.json({ success: true });
}

// DELETE announcement
export async function DELETE(req: NextRequest) {
  const { announcement_id } = await req.json();
  await pool.query<ResultSetHeader>(
    "DELETE FROM announcements WHERE announcement_id=?",
    [announcement_id]
  );
  return NextResponse.json({ success: true });
}
