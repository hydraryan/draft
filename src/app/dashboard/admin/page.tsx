"use client";

import Link from "next/link";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaBullhorn,
  FaUserCircle,
  FaUsers,
  FaCheckCircle,
  FaTools,
  FaChartLine,
  FaCog,
  FaBook,
} from "react-icons/fa";
import { ReactNode } from "react";

// Reusable card component for the dashboard features
interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  content?: string;
  href: string;
  className?: string;
  children?: ReactNode;
}

const DashboardCard = ({ title, icon, content, href, className, children }: DashboardCardProps) => (
  <Link
    href={href}
    className={`flex transform flex-col rounded-xl border-2 border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm 
               transition-all duration-300 hover:border-white/30 hover:scale-105 ${className}`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="text-3xl text-white">{icon}</div>
      <h3 className="font-bebas-neue text-2xl uppercase text-white tracking-wider">{title}</h3>
    </div>
    {content && <p className="text-gray-300 text-sm">{content}</p>}
    {children}
  </Link>
);

// Hero Banner - Today's Shoot Overview
const HeroBanner = () => (
  <div className="bg-netflix-red p-6 md:p-8 rounded-xl shadow-lg">
    <h2 className="text-3xl md:text-5xl font-anton uppercase tracking-wider text-white mb-2">
      Today's Shoot Overview
    </h2>
    <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
      <div className="flex flex-col">
        <span className="text-white/70">Scenes:</span>
        <span className="font-bold">Scene 12B, Scene 13A</span>
      </div>
      <div className="flex flex-col">
        <span className="text-white/70">Cast & Crew Call Time:</span>
        <span className="font-bold">9:00 AM</span>
      </div>
      <div className="flex flex-col">
        <span className="text-white/70">Props Checklist:</span>
        <span className="font-bold">Completed</span>
      </div>
      <div className="flex flex-col">
        <span className="text-white/70">Status:</span>
        <span className="font-bold text-green-300">On Schedule</span>
      </div>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  const userName = "Admin User";
  const userRole = "Director";

  return (
    <div className="min-h-screen cinematic-gradient p-6 md:p-12 text-white">
      <header className="flex items-center justify-between pb-8 border-b-2 border-white/10">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl text-gray-400" />
          <div>
            <p className="text-xl md:text-2xl font-semibold">{userName}</p>
            <p className="text-sm text-gray-400">{userRole}</p>
          </div>
        </div>
        <Link href="/">
          <button className="rounded-full bg-netflix-red px-6 py-2 font-bold uppercase text-white shadow-lg transition duration-300 hover:bg-red-700">
            Logout
          </button>
        </Link>
      </header>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <HeroBanner />
        </div>
      </div>

      {/* Production Management */}
      <div className="mt-8">
        <h3 className="font-anton text-3xl uppercase text-white tracking-wider mb-4">Production Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Call Sheet Management"
            icon={<FaFileAlt />}
            content="Upload, edit, and assign call sheets to cast and crew."
            href="/dashboard/admin/call-sheets"
          />
          <DashboardCard
            title="Shooting Schedule"
            icon={<FaCalendarAlt />}
            content="Master calendar for all shoots with drag-and-drop rescheduling."
            href="/dashboard/admin/schedules"
          />
          <DashboardCard
            title="Script & Monologue Control"
            icon={<FaBook />}
            content="Upload, edit, and assign scripts with version control."
            href="/dashboard/admin/scripts"
          />
        </div>
      </div>

      {/* People & Resources */}
      <div className="mt-8">
        <h3 className="font-anton text-3xl uppercase text-white tracking-wider mb-4">People & Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Cast & Crew Management"
            icon={<FaUsers />}
            content="Add, remove, and edit user accounts and roles."
            href="/dashboard/admin/users"
          />
          <DashboardCard
            title="Upload & Approval"
            icon={<FaCheckCircle />}
            content="Approve or reject crew uploads and manage the central library."
            href="/dashboard/admin/uploads"
          />
          <DashboardCard
            title="Inventory & Props Oversight"
            icon={<FaTools />}
            content="Manage all props and equipment and track their status."
            href="/dashboard/admin/inventory"
          />
        </div>
      </div>

      {/* Communication & Reports */}
      <div className="mt-8">
        <h3 className="font-anton text-3xl uppercase text-white tracking-wider mb-4">Communication & Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Announcements & Messages"
            icon={<FaBullhorn />}
            content="Post urgent announcements and send targeted messages to cast or crew."
            href="/dashboard/admin/announcements"
          />
          <DashboardCard
            title="Progress & Reports"
            icon={<FaChartLine />}
            content="Track shooting progress scene by scene, and export reports."
            href="/dashboard/admin/reports"
          />
          <DashboardCard
            title="Settings & Permissions"
            icon={<FaCog />}
            content="Control dashboard layouts and set permissions for all users."
            href="/dashboard/admin/settings"
          />
        </div>
      </div>
    </div>
  );
}
