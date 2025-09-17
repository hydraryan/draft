"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    target_group: "all",
    target_type: "all",
    target_value: "",
    priority: "normal",
  });

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const res = await fetch("/api/announcements", {
      credentials: "include", // ✅ send cookies
    });
    if (res.ok) {
      const data = await res.json();
      setAnnouncements(data);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...formData, announcement_id: editingId } : formData;

    const res = await fetch("/api/announcements", {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ send cookies
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setFormData({
        title: "",
        message: "",
        target_group: "all",
        target_type: "all",
        target_value: "",
        priority: "normal",
      });
      setEditingId(null);
      fetchAnnouncements();
    }
  };

  const handleEdit = (announcement: any) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      target_group: announcement.target_group,
      target_type: announcement.target_type,
      target_value: announcement.target_value || "",
      priority: announcement.priority,
    });
    setEditingId(announcement.announcement_id);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/announcements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ send cookies
      body: JSON.stringify({ announcement_id: id }),
    });

    if (res.ok) {
      fetchAnnouncements();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard - Manage Announcements</h1>

      {/* Announcement Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
          required
        />

        <select
          name="target_group"
          value={formData.target_group}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
        >
          <option value="all">All</option>
          <option value="students">Students</option>
          <option value="staff">Staff</option>
        </select>

        <select
          name="target_type"
          value={formData.target_type}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
        >
          <option value="all">All</option>
          <option value="department">Department</option>
          <option value="year">Year</option>
          <option value="course">Course</option>
        </select>

        <input
          type="text"
          name="target_value"
          placeholder="Target Value (if applicable)"
          value={formData.target_value}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-2 border mb-4"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Announcement" : "Create Announcement"}
        </button>
      </form>

      {/* Announcements List */}
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-bold mb-4">Existing Announcements</h2>
        {announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          announcements.map((a) => (
            <div
              key={a.announcement_id}
              className="border-b py-2 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.message}</p>
                <p className="text-sm text-gray-500">
                  {a.target_group} | {a.target_type} | {a.priority}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.announcement_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
